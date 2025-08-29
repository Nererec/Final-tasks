import he from 'he';

export function parseAPIResponse(markup) {
 
  if (!markup || typeof markup !== 'string') {
    console.error("Invalid markup provided to parseAPIResponse:", markup);
    return { textContent: "", imageUrl: null };
  }

  try {
   
    const decodedMarkup = he.decode(markup);

   
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(decodedMarkup, "text/html");

   
    const sentences = Array.from(xmlDoc.getElementsByTagName("sentence"));
    const textContent = sentences.map(sentence => sentence.textContent.trim()).join(" ");

    
    const imgTag = xmlDoc.querySelector("img");
    const imageUrl = imgTag ? imgTag.getAttribute("src") : null;

    return { textContent, imageUrl };
  } catch (error) {
    console.error("Error parsing API response:", error);
    return { textContent: "", imageUrl: null };
  }
}
