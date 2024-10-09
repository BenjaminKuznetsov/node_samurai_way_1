const http = require("http")
const fs = require("fs")
const path = require("path")

let requestsCount = 0

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    const faviconPath = path.join(__dirname, "favicon.ico")
    fs.readFile(faviconPath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.write("Favicon not found")
      } else {
        res.writeHead(200, { "Content-Type": "image/x-icon" })
        res.write(data)
      }
      res.end()
    })
    return
  }

  requestsCount++

  switch (req.url) {
    case "/students":
      res.write("STUDENTS")
      break

    case "/":
    case "/courses":
      res.write("COURSES")
      break

    default:
      res.write("NOT FOUND")
  }

  res.write("\nREQUESTS: " + requestsCount)
  res.end()
})

server.listen(3003)
