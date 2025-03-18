function downloadFile(text, fileName = new Date().toISOString()) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function readUploadedFile(file, callback = () => {}) {
  const fileReader = new FileReader();

  fileReader.readAsText(file, "UTF-8");
  fileReader.onload = callback;
}

export { downloadFile, readUploadedFile };
