"use client";

import { useState } from "react";

export default function AdminQuestionsPage() {
const [file, setFile] = useState<File | null>(null);
const [message, setMessage] = useState("");

const [uploadResult, setUploadResult] = useState<any>(null);

async function uploadFile() {
if (!file) {
setMessage("Please select a file.");
return;
}

const formData = new FormData();
formData.append("file", file);
try {
  const response = await fetch(
    "http://2.25.173.35:3001/questions/upload",
    {
      method: "POST",
      body: formData,
    }
  );
const data = await response.json();

if (response.ok) {

  setUploadResult(data);

  setMessage(

    "Upload Complete"

  );

} else {

  setMessage(

    data.message || "Upload failed"

  );

}

} catch (error) {
  console.error(error);
  setMessage("Upload failed");
}

}

return (
<div className="min-h-screen bg-slate-100 p-8">
<h1 className="text-3xl font-bold mb-6">
      Question Upload Portal
    </h1>
    <a
      href="/templates/PMP_Question_Template.xlsx"
      download
      className="inline-block mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
    >
      Download Excel  Template
    </a>

    <p className="text-gray-600 mb-6">
      Upload an Excel file containing PMP questions.
    </p>
    <input
      type="file"
      accept=".xlsx,.xls"
      onChange={(e) =>
        setFile(e.target.files?.[0] || null)
      }
      className="mb-6 block w-full border rounded-lg p-3"
    />
    <button
      onClick={uploadFile}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
    >
      Upload Questions
    </button>
    {message && (

  <div className="mt-6 p-4 rounded-lg bg-green-100 border border-green-300">

    <h3 className="font-bold text-xl mb-4">

      {message}

    </h3>

    {uploadResult && (

      <div className="space-y-2">

        <p>

          <strong>Uploaded Rows:</strong>{" "}

          {uploadResult.uploadedRows}

        </p>

        <p>

          <strong>Inserted Rows:</strong>{" "}

          {uploadResult.insertedRows}

        </p>

          <p>

          <strong>Duplicate Rows:</strong>{" "}

          {uploadResult.duplicateRows}

        </p>

        <p>

          <strong>Failed Rows:</strong>{" "}

          {uploadResult.failedRows}

        </p>

      </div>

    )}

  </div>

)}   

  </div>

);
}
