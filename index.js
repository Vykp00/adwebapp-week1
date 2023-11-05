if (document.readyState !== "loading") {
    console.log("Document is ready");
    addCSS();
    getDogAPI();
    getDogAPI();
    getDogAPI();
    getDogAPI();
    getDogAPI();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("Document is ready after loading");
        addCSS();
        getDogAPI();
        getDogAPI();
        getDogAPI();
        getDogAPI();
        getDogAPI();
    })
}

async function getDogAPI() {
    const breedName = "corgi";
    // Capitalize first letter 
    const breedTitle = breedName[0].toUpperCase() + breedName.slice(1);
    const pageTitle = "Cardigan_Welsh_Corgi";  // get Wikipedia Title

    //Set JSON object
    const dogResult = {
        breed: `${breedTitle}`,
        imgURl: "",
        wikiText: ""
    };


    // Error handling
    // get JSON image file by bread
    try {
        let response = await fetch(`https://dog.ceo/api/breed/${breedName}/images/random`);
        let dogImage = await response.json();
        console.log(dogImage);

        // get image url
        dogResult.imgURl = dogImage.message;

    } catch (err) {
        alert(err); // TypeError: failed to fetch
    }
    
    // Error handling
    // get JSON result from Wikipedia API
    try {
        let response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${pageTitle}`);
        let response_body = await response.json();
        console.log(response_body);

        dogResult.wikiText = response_body.extract;
    } catch (err) {
        alert(err); // TypeError: failed to fetch
    }

    return addWikiItem(dogResult);
}
function addWikiItem(dogResult) {
    // create a new wiki item
    const newWikiTitem = document.createElement("div");
    //add class name
    newWikiTitem.className = "wiki-item";
    const newWikiHeader = document.createElement("h1");
    newWikiHeader.className = "wiki-header";
    const newHeaderText = document.createTextNode(dogResult.breed);

    // append header to div wiki-content
    newWikiHeader.appendChild(newHeaderText);
    newWikiTitem.appendChild(newWikiHeader);


    // create a new wiki content
    const newWikiContent = document.createElement("div");
    newWikiContent.className = "wiki-content";
    const newWikiText = document.createElement("p");
    newWikiText.className = "wiki-text";
    const wikiTextContent = document.createTextNode(dogResult.wikiText);

    const newImageContainer = document.createElement("div");
    newImageContainer.className = "img-container"
    const newWikiImage = document.createElement("img");
    newWikiImage.className = "wiki-img";
    newWikiImage.src = dogResult.imgURl;
    newImageContainer.appendChild(newWikiImage);

    //append header wiki-text in wiki-content
    newWikiText.appendChild(wikiTextContent);
    newWikiContent.appendChild(newWikiText);
    //append image-container after wiki-text
    newWikiContent.appendChild(newImageContainer);
    //append wiki-content to wiki-item
    newWikiTitem.appendChild(newWikiContent);

    const container = document.getElementById("container")
    container.appendChild(newWikiTitem);
}

function addCSS() {
        // Create new link Element
        let link = document.createElement('link');
         
        // set the attributes for link element
        link.rel = "stylesheet";
             
        link.type = "text/css";
             
        link.href = "./style.css";

        link.media = "mediatype"
         
        // Get HTML head element to append
        // link element to it
        document.getElementsByTagName("HEAD")[0].appendChild(link);
}