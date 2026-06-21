const fs = require('fs')
const path = require('path')

const PAGE_MAP = {
  'index.html': '/',
  'melto.html': '/melto',
  'tangaroa.html': '/tangaroa',
  'cymusic.html': '/cymusic',
  'gallipoli.html': '/gallipoli',
  'pretty-ugly.html': '/pretty-ugly',
  'touch-soil.html': '/touch-soil',
  '404.html': '/404',
  '401.html': '/401',
}

function fixPaths(html) {
  let out = html
  // Make relative asset paths absolute so they work from any route
  out = out.replace(/src="images\//g, 'src="/images/')
  out = out.replace(/href="images\//g, 'href="/images/')
  out = out.replace(/src="js\//g, 'src="/js/')
  out = out.replace(/href="css\//g, 'href="/css/')
  out = out.replace(/url\(images\//g, 'url(/images/')
  // Rewrite .html page links to Next.js routes
  for (const [file, route] of Object.entries(PAGE_MAP)) {
    out = out.replace(new RegExp(`href="${file}"`, 'g'), `href="${route}"`)
    out = out.replace(new RegExp(`href="${file}#`, 'g'), `href="${route}#`)
  }
  return out
}

function getPageHtml(filename) {
  const html = fs.readFileSync(path.join(process.cwd(), filename), 'utf8')

  const titleMatch = html.match(/<title>(.*?)<\/title>/i)
  const title = titleMatch ? titleMatch[1] : 'WrattyDesign'

  const descMatch = html.match(/<meta\s+content="([^"]+)"\s+name="description"/i)
  const description = descMatch ? descMatch[1] : ''

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  let bodyHtml = bodyMatch ? bodyMatch[1] : ''

  // Strip <script> tags — they don't execute via dangerouslySetInnerHTML;
  // scripts are loaded separately via next/script in _app.js
  bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '')

  bodyHtml = fixPaths(bodyHtml)

  return { title, description, bodyHtml }
}

module.exports = { getPageHtml }
