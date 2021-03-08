(function(){
    const commentReplaceMark = 'cards:replace';
   const regex={
        codeMarkup: /(```[\s\S]*?```)/gm,

    // Matches tab replacement comment
    // 0: Match
    // 1: Replacement HTML
        commentReplaceMarkup: new RegExp(`<!-- ${commentReplaceMark} (.*) -->`),
        cardGroup:/[\r\n]*(\s*)(<!-+\s+cards:\s*?start\s+-+>)[\r\n]+([\s|\S]*?)[\r\n\s]+(<!-+\s+cards:\s*?end\s+-+>)/m,
        cardsInfo:/[\r\n]*(\s*)<!+-+\s*cards:start\s*-+>[\r\n]*\s*INFO=[A-Za-z]+@[a-zA-Z]+-[0-9]/m,
        allCards:/[\r\n]?(\s)*#{1,6}\s*[A-za-z]+\s*=\s*.*[a-zA-z0-9/*a-zA-z/.a-zA-z]+\s*,[\r\n]*(\s)*[A-Za-z=\s*,=\s*0-9]+/mg,
   }

  function renderCardsStage1(content){
    const codeBlockMatch   = content.match(regex.codeMarkup) || [];
    console.log(codeBlockMatch)
    const codeBlockMarkers = codeBlockMatch.map((item, i) => {
        const codeMarker = `<!-- ${commentReplaceMark} CODEBLOCK${i} -->`;
        console.log(codeMarker)
        console.log(codeBlockMarkers);
        // Replace code block with marker to ensure tab markup within code
        // blocks is not processed. These markers are replaced with their
        // associated code blocs after tabs have been processed.
        content = content.replace(item, () => codeMarker);
       
        return codeMarker;
    });
        let cardBlockMatch; // eslint-disable-line no-unused-vars
        cardBlockMatch = regex.cardGroup.exec(content)
         //get All cards Details
       let cards=content.match(regex.allCards)|| [];
       let cardBlock  = cardBlockMatch[0];

         let cardStartReplacement = '';
         let cardEndReplacement   = '';
         const cardBlockIndent = cardBlockMatch[1];
        //  const cardBlockStart  = cardBlockMatch[2];
        //  const cardBlockEnd    = cardBlockMatch[4];
         if(cardBlock){
            cardStartReplacement = `<!-- ${commentReplaceMark} <div> -->`;
            cardEndReplacement = `\n${cardBlockIndent}<!-- ${commentReplaceMark} </div> -->`;
            console.log(cardStartReplacement);
            console.log(cardEndReplacement);
        }
     let cardDom= createCards(cards);

     content = content.replace(cardBlockMatch[0], () => cardDom);
    return content
}
 
function createCards(cards){
      return(
          "<div class='row'>"+
               cards.map((card,index)=>{
                   console.log(card);
                   
                   let cardDetail=card.split('=');
                   let cardsize=cardDetail[3].trim();
                   console.log(cardDetail[3])
              return(  "<div class='col-sm-"+cardsize+"'>"+
                "<div class='bg-primary text-white card'>"+
                    "<img class='align-right' src='"+`${cardDetail[1].split(',')[0]}`+"' alt='"+`${index}`+"'>"+
                    "</img>"+
                    "<div class='card-body'>"+
                    "<h5 class='card-title text-uppercase text-white'>"+cardDetail[2].split(',')[0]+"</h5>"+
                    "<p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>"+
                    "<button href='#' class='btn btn-success '>Go somewhere</button>"+
                "</div>"+
            "</div>"+"</div>")
        })
          +"</div>"
      ).replace(/,/g," ")
}
function docsifyCards(hook,vm){
      let hasCard=false;
         hook.beforeEach(function(content) {
         hasCard = regex.cardGroup.test(content);
        if (hasCard) {
                content=renderCardsStage1(content)
          }
          return content;
        })
}
if (window ) {
    var dom = Docsify.dom;
    console.log(dom);
    $docsify.plugins = [].concat(docsifyCards, $docsify.plugins);

  }
})()

