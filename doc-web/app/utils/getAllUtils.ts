export async function getAllUtils() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/utils`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Utils');
  }

  return res.json();
}

export async function getUtilBySlug(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/utils/${slug}`, {
    cache: 'no-store',
  });

  if (res.status === 404) {
    return null; // returning null so page can call notFound()
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch ${slug} Util`);
  }

  return res.json();
}
