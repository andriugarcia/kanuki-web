
export default async function importStyle(type) {
    let heds = document.getElementsByTagName("head")
    let link = document.createElement("link")
    link.href = `http://localhost:8200/kanuki-${type}/kanuki-${type}.css`
    link.rel = "stylesheet"
    link.type = "text/css"

    heds[0].appendChild(link)
}