(function(){
   
    //   return('<div class="card">',
    //   '<img src="../_images/logo.png" alt="Avatar">',
    //   '<div class="container">',
    //   '<h4><b>Jane Doe</b></h4>', 
    //     '<p>Interior Designer</p> ',
    //   '</div>',
    // '</div>')

    // var createCardDiv = function createCardDiv(background) {
    //     let cardDiv=document.createElement('div');
    //     cardDiv.classList.add('card');
    //     cardDiv.style.background=background ||'lightgray';
    //     return cardDiv;
   // }
    // var createImage=function createImage(img){
    //     var image=document.createElement('img');
    //     image.setAttribute('src','../_images/logo.png');
    //     image.src='../_images/logo.png';
    //     image.style.height='50px';
    //     image.style.width='50px';
    //     image.style.alignItems='center';
    //     return image;
    // }
    // var cardBody=function cardBody(){
    //     var div=document.createElement('div');
    //     div.classList='container';
    //     return div;
    // }

    // var cardHeader=function cardHeader(){
    //     var h1=document.createElement('h4');
    //     let b=document.createElement('b')
    //     h1.appendChild(b);
       
    //     // h1.nextSibling('<p>Interior Designer</p> ');
    //     return h1;

    // }
    // cardBody().appendChild(cardHeader());

     //var mainDiv=createCardDiv();
    // mainDiv.appendChild(createImage());
    // mainDiv.appendChild(cardBody());
    
//return mainDiv;
// function install(hook) {
//  hook.done
// }





    // Matches tab set by start/end comment
    // 0: Match
    // 1: Indent
    // 2: Start comment: <!-- card:start -->
    // 3: Labels and content
    // 4: End comment: <!-- card:end -->
    const commentReplaceMark = 'card:replace';
    const regex = {
        // 1: Replacement HTML
        commentReplaceMarkup: new RegExp(`<!-- ${commentReplaceMark} (.*) -->`),
        codeMarkup: /(```[\s\S]*?```)/gm,
        cardBlockMarkup: /[\r\n]*(\s*)(<!-+\s+card:\s*?start\s+-+>)[\r\n]+([\s|\S]*?)[\r\n\s]+(<!-+\s+card:\s*?end\s+-+>)/m,
        cardTextMarkup: /[\r\n]*(\s*)<!-+\s+card:\s*(.*)\s+-+>[\r\n]+([\s\S]*?)[\r\n]*\s*(?=<!-+\s+card?:(?!replace))/m,
        cardImageMarkup: /[\r\n]*(\s*)#{1,6}\s*[*_]{2}\s*(.*[^\s])\s*[*_]{2}[\r\n]+([\s\S]*?)(?=#{1,6}\s*[*_]{2}|<!-+\s+card:\s*?end\s+-+>)/m
    }

  function renderCardStage1(content){
    const codeBlockMatch   = content.match(regex.codeMarkup) || [];
    console.log(codeBlockMatch)
    const codeBlockMarkers = codeBlockMatch.map((item, i) => {
        const codeMarker = `<!-- ${commentReplaceMark} CODEBLOCK${i} -->`;
        console.log(codeMarker)
        // Replace code block with marker to ensure card markup within code
        // blocks is not processed. These markers are replaced with their
        // associated code blocs after card have been processed.
        content = content.replace(item, () => codeMarker);
        console.log(content);
        return codeMarker;
    });
   // return codeBlockMarkers
    console.log(codeBlockMarkers);
    let cardBlockMatch; // eslint-disable-line no-unused-vars
    cardBlockMatch = regex.cardBlockMarkup.exec(content)
        console.log(cardBlockMatch);
        let cardBlock  = cardBlockMatch[0];
        let cardStartReplacement = '';
        let cardEndReplacement   = '';
        const hasCardText =  regex.cardTextMarkup.test(cardBlock);
        const hasCardImage = regex.cardImageMarkup.test(cardBlock);
        const cardBlockIndent = cardBlockMatch[1];
        const cardBlockStart  = cardBlockMatch[2];
        const cardBlockEnd    = cardBlockMatch[4];
        console.log(cardBlock);
        console.log(cardBlockIndent);
        console.log(cardBlockStart);
        console.log(cardBlockEnd)
        console.log(hasCardText);
        console.log(hasCardImage)
        if(cardBlock){
            cardStartReplacement = `<!-- ${commentReplaceMark} <div class="card"> -->`;
            cardEndReplacement = `\n${cardBlockIndent}<!-- ${commentReplaceMark} </div> -->`;
            console.log(cardStartReplacement);
            console.log(cardEndReplacement);
        }
        let cardMatch =(regex.cardTextMarkup.exec(cardBlock)? regex.cardTextMarkup.exec(cardBlock) : null) || (regex.cardImageMarkup.exec(cardBlock)? regex.cardImageMarkup.exec(cardBlock) : null)
        console.log(cardMatch)
        const cardTitle   = (cardMatch[2] || '[Card]').trim();
                const cardContent = (cardMatch[3] || '').trim();
                console.log(cardTitle);
                console.log(cardContent.split("'"))
                let cardInfo=cardContent.split("'")
                let cardText=cardInfo[2].split("**")
                console.log(cardText);
     cardBlock = cardBlock.replace(cardBlock, () => [
        '<div class="card" style="background-color:lightgray;">',
          '<img src='+`"${cardInfo[1]}"`+' alt="Avatar" class="card-image">',
          '<div class="container">',
          '<h4><b>'+`${cardText[1]}`+'</b></h4>', 
            '<p>Interior Designer</p> ',
          '</div>',
        '</div>'
        ].join(''));

        cardBlock = cardBlock.replace(cardBlockStart, () => cardStartReplacement);
        cardBlock = cardBlock.replace(cardBlockEnd, () => cardEndReplacement);
        content = content.replace(cardBlockMatch[0], () => cardBlock);
        return content;
  
}


function docsifyCard(hook, vm) {
    let hasCard = false;

  return  hook.beforeEach(function(content) {
      console.log(content);
        hasCard = regex.cardBlockMarkup.test(content);
        if (hasCard) {
            console.log("hi")
              content = renderCardStage1(content)
        }
        console.log(content)
        return content;
    });

 }

if (window ) {
    var dom = Docsify.dom;
    console.log(dom);
    $docsify.plugins = [].concat(docsifyCard, $docsify.plugins);
}
})()

