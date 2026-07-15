const OPENAI_IMAGES_URL = "https://api.openai.com/v1/images/generations";

exports.handler = async function () {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return jsonResponse(500, {
      error: "OPENAI_API_KEY is missing in Netlify."
    });
  }

  try {
    const openAIResponse = await fetch(OPENAI_IMAGES_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: "Create an album cover",
        size: "1024x1024",
        quality: "medium",
        output_format: "png"
      })
    });

    const result = await openAIResponse.json();

    if (!openAIResponse.ok) {
      console.error("OpenAI API error:", result);

      return jsonResponse(openAIResponse.status, {
        error:
          result?.error?.message ||
          "OpenAI could not generate the image."
      });
    }

    const imageBase64 = result?.data?.[0]?.b64_json;

    if (!imageBase64) {
      console.error("Unexpected OpenAI response:", result);

      return jsonResponse(502, {
        error: "The image API returned no image data."
      });
    }

    return jsonResponse(200, {
      imageBase64,
      mimeType: "image/png"
    });
  } catch (error) {
    console.error("Function error:", error);

    return jsonResponse(500, {
      error: "The server function failed while generating the image."
    });
  }
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(body)
  };
}
