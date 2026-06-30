/** Join backend origin (may include a path prefix, e.g. API Gateway `/prod`) with an API path. */
export function backendApiUrl(backendApiOrigin: string, path: string): URL {
  const base = `${backendApiOrigin}`.replace(/\/$/, '') + '/'
  return new URL(path.replace(/^\//, ''), base)
}
