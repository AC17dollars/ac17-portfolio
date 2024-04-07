addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (new URL(request.url).pathname === '/vision-cube-demo/video') {
    const fileContent = await fetch('assets/[Demo] Vision-aided Mechanical Design for an Autonomous Rubik\'s Cube Solver.mp4')
    const headers = new Headers(fileContent.headers)

    headers.set('Content-Disposition', 'attachment; filename="[Demo] Vision-aided Mechanical Design for an Autonomous Rubik\'s Cube Solver.mp4"')

    const modifiedResponse = new Response(fileContent.body, {
      status: fileContent.status,
      statusText: fileContent.statusText,
      headers,
    })
    return modifiedResponse
  }
  return new Response('Not Found', { status: 404 })
}

