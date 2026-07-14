const API_URL = 'https://api.github.com/repos/torinaViolet/CharacterEditor-Releases/releases/latest'

async function loadLatestRelease() {
  try {
    const response = await fetch(API_URL, { headers: { Accept: 'application/vnd.github+json' } })
    if (!response.ok) return
    const release = await response.json()
    const version = release.tag_name || release.name
    const windowsInstaller = release.assets?.find((asset) => /CharacterEditor-Windows-x64-setup\.exe$/i.test(asset.name))
      || release.assets?.find((asset) => /x64-setup\.exe$/i.test(asset.name))
    const androidInstaller = release.assets?.find((asset) => /CharacterEditor-Android-arm64\.apk$/i.test(asset.name))
      || release.assets?.find((asset) => /\.apk$/i.test(asset.name))
    document.querySelectorAll('[data-version]').forEach((node) => { node.textContent = version })
    document.querySelectorAll('[data-download-windows]').forEach((node) => {
      node.href = windowsInstaller?.browser_download_url || release.html_url
    })
    document.querySelectorAll('[data-download-android]').forEach((node) => {
      node.href = androidInstaller?.browser_download_url || release.html_url
    })
    const note = document.querySelector('[data-release-note]')
    if (note && release.name) note.textContent = `${release.name} 的 Windows 与 Android 版现已提供下载。`
  } catch {
    // The static page remains fully usable when GitHub's API is unavailable.
  }
}

loadLatestRelease()
