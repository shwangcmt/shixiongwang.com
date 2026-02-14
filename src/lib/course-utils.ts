import { getCollection } from 'astro:content';

export interface CourseEntry {
    label: string;
    href: string;
    isCurrent: boolean;
}

/** Non-course top-level route segments to skip */
const SKIP_SEGMENTS = new Set(['teaching', 'research', 'reference']);

/** Cache keyed by pathname — avoids recomputing when both Sidebar and Pagination call this for the same page */
const cache = new Map<string, CourseEntry[] | null>();

/**
 * Returns sorted course entries for the given pathname, or null if not a course page.
 * Results are memoized per pathname so Sidebar + Pagination share one computation.
 */
export async function getCourseEntries(pathname: string): Promise<CourseEntry[] | null> {
    if (cache.has(pathname)) return cache.get(pathname)!;

    const result = await computeCourseEntries(pathname);
    cache.set(pathname, result);
    return result;
}

async function computeCourseEntries(pathname: string): Promise<CourseEntry[] | null> {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return null;

    const potentialId = pathSegments[0];
    if (SKIP_SEGMENTS.has(potentialId)) return null;

    const allDocs = await getCollection('docs');

    const courseDocs = allDocs.filter(doc =>
        doc.id === potentialId ||
        doc.id.startsWith(`${potentialId}/`) ||
        doc.id === `courses/${potentialId}` ||
        doc.id.startsWith(`courses/${potentialId}/`)
    );

    if (courseDocs.length === 0) return null;

    courseDocs.sort((a, b) => {
        const orderA = a.data.sidebar?.order ?? 9999;
        const orderB = b.data.sidebar?.order ?? 9999;
        if (orderA !== orderB) return orderA - orderB;
        return a.data.title.localeCompare(b.data.title);
    });

    return courseDocs.map(doc => {
        const entry = doc as any;
        const slug = entry.slug || entry.id.replace(/\.[^/.]+$/, '');
        const href = `/${slug}`;
        return {
            label: entry.data.sidebar?.label || entry.data.title,
            href,
            isCurrent: pathname === href || pathname === href + '/',
        };
    });
}
