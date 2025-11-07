import React, { useState } from 'react';

const CloudinaryTest = () => {
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testCloudinary = async () => {
    setIsLoading(true);
    setTestResult('Testing Cloudinary configuration...');

    try {
      // Create a simple test file
      const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
      
      const formData = new FormData();
      formData.append('file', testFile);
      formData.append('upload_preset', 'glocalship');
      formData.append('cloud_name', 'dcjn4y284');

      console.log('Testing Cloudinary with:', {
        preset: 'glocalship',
        cloud: 'dcjn4y284',
        file: testFile
      });

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dcjn4y284/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setTestResult(`❌ Upload failed: ${response.status} ${errorText}`);
        return;
      }

      const data = await response.json();
      console.log('Success response:', data);
      
      if (data.secure_url) {
        setTestResult(`✅ Upload successful! URL: ${data.secure_url}`);
      } else {
        setTestResult(`❌ No secure_url in response: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error('Test error:', error);
      setTestResult(`❌ Test failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Cloudinary Configuration Test</h3>
      
      <button
        onClick={testCloudinary}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 mb-4"
      >
        {isLoading ? 'Testing...' : 'Test Cloudinary Configuration'}
      </button>

      {testResult && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Current Configuration:</strong></p>
        <p>Cloud Name: dcjn4y284</p>
        <p>Upload Preset: glocalship</p>
        <p>Upload URL: https://api.cloudinary.com/v1_1/dcjn4y284/image/upload</p>
      </div>
    </div>
  );
};

export default CloudinaryTest;
