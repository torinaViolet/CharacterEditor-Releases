const API_URL = 'https://api.github.com/repos/torinaViolet/CharacterEditor-Releases/releases/latest'

async function loadLatestRelease() {
  try {
    const response = await fetch(API_URL, { headers: { Accept: 'application/vnd.github+json' } })
    if (!response.ok) return
    const release = await response.json()
    const version = release.tag_name || release.name
    const installer = release.assets?.find((asset) => /x64-setup\.exe$/i.test(asset.name))
    document.querySelectorAll('[data-version]').forEach((node) => { node.textContent = version })
    document.querySelectorAll('[data-download]').forEach((node) => {
      node.href = installer?.browser_download_url || release.html_url
    })
    const note = document.querySelector('[data-release-note]')
    if (note && release.name) note.textContent = `${release.name} 现已提供下载，应用内支持安全更新检查。`
  } catch {
    // The static page remains fully usable when GitHub's API is unavailable.
  }
}

loadLatestRelease()
