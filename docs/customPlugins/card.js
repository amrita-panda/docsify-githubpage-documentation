(function () {
  const commentReplaceMark = "cards:replace";
  const regex = {
    codeMarkup: /(```[\s\S]*?```)/gm,

    // Matches tab replacement comment
    // 0: Match
    // 1: Replacement HTML
    commentReplaceMarkup: new RegExp(`<!-- ${commentReplaceMark} (.*) -->`),
    cardGroup: /[\r\n]*(\s*)(<!-+\s+cards:\s*?start\s+-+>)[\r\n]+([\s|\S]*?)[\r\n\s]+(<!-+\s+cards:\s*?end\s+-+>)/gm,
    cardsInfo: /[\r\n]*(\s*)<!+-+\s*cards:start\s*-+>[\r\n]*\s*INFO=[A-Za-z]+@[a-zA-Z]+-[0-9]/m,
    allCards: /[\r\n]*(\s)*#{1,6}\s*[a-zA-z=]+\s*([a-zA-Z])=\s*.*[\r\n]*(\s)*[a-zA-Z]+=\s*[a-zA-Z]+(\s)?[a-zA-Z]+\s,\s*[a-zA-z]+\s*=\s*([a-zA-z-]+)?(\s)*,[\r\n]*(\s)*[a-zA-Z]+=\s*[0-9]\s*/gm,
    allCardsThemeTwo:/[\r\n]*(\s)*HEADING\s*=\s*[a-zA-z\s*]+\s*,\s*[a-zA-Z]+\s*=\s*([a-zA-Z-]+\s*,)?(,)?[\r\n]*(\s)*[a-zA-Z]+\s*=\s*[A-Za-z\s*@]+\s*,\s*[a-zA-Z]+\s*=\s*([a-zA-Z-]+\s*,)?(,)?[\r\n]*(\s)*[a-zA-Z]+\s*=\s*[0-9]\s*/gm,
    allCardsThemeThree:/[\r\n]*(\s)*LINKTITLE\s*=\s*[A-Za-z\s*]+\s*,\s*[a-zA-z]+\s*=\s*([a-zA-Z-]+,)?(,)?[\r\n]*(\s)*[A-Za-z]+\s*=\s*[a-zA-Z\s*]+.*\/[a-zA-Z.]+\s*,\s*[a-zA-Z]+\s*=\s*([a-zA-Z-]+,)?(,)?[\r\n]*(\s)*[a-zA-Z]+\s*=\s*[a-zA-Z\s*,]+\s*=\s*([a-zA-Z-]+,)?(,)?[\r\n]*(\s)*[a-zA-Z]+\s*=\s*[0-9]\s*/gm,
    class: /[\r\n]*(\s)*class\s*/gm,
  };

  function renderCardsStage1(content) {
    const codeBlockMatch = content.match(regex.codeMarkup) || [];
    console.log(codeBlockMatch);
    const codeBlockMarkers = codeBlockMatch.map((item, i) => {
      const codeMarker = `<!-- ${commentReplaceMark} CODEBLOCK${i} -->`;
      console.log(codeMarker);
      console.log(codeBlockMarkers);
      // Replace code block with marker to ensure card markup within code
      // blocks is not processed. These markers are replaced with their
      // associated code blocs after cards have been processed.
      content = content.replace(item, () => codeMarker);

      return codeMarker;
    });
    let cardBlockMatch; // eslint-disable-line no-unused-vars
    cardBlockMatch = regex.cardGroup.exec(content);
    let arrayGroup=content.match(regex.cardGroup)
  arrayGroup.map((cardGroup,index)=>{
    //get All cards Details
    let cardsInfo=arrayGroup[index].match(regex.cardsInfo)
     let cardType=cardsInfo[0].split('@')[1]
     if(cardType==='cardTheme-1'){
      let cards =  arrayGroup[index].match(regex.allCards) || [];
      console.log(cards);
      let cardDom = createCards(cards);
      content = content.replace(arrayGroup[index],() => cardDom);
     }else if(cardType==='cardTheme-2'){
       let cards=arrayGroup[index].match(regex.allCardsThemeTwo) || [];
        let cardDom=createThemeTwoCards(cards);
        content=content.replace(arrayGroup[index],()=>cardDom)
     }else if(cardType==='cardTheme-3'){
      let cards=arrayGroup[index].match(regex.allCardsThemeThree) || [];
      console.log(cards);
      let cardDom=createThemeThreeCard(cards);
      content=content.replace(arrayGroup[index],()=>cardDom)
     }
  
    // let cardBlock = arrayGroup[index];
    // let cardStartReplacement = "";
    // let cardEndReplacement = "";
    // const cardBlockIndent = cardBlockMatch[1];
   // if (cardBlock) {
    //   cardStartReplacement = `<!-- ${commentReplaceMark} <div> -->`;
    //   cardEndReplacement = `\n${cardBlockIndent}<!-- ${commentReplaceMark} </div> -->`;
    //   console.log(cardStartReplacement);
    //   console.log(cardEndReplacement);
    // }
    // let cardDom = createCards(cards);
    // content = content.replace(arrayGroup[index],() => cardDom);
   
  })
    return content;
  }

  function createCards(cards) {
    return (
      "<div class='row'>" +
      cards.map((card, index) => {
        let imageClass, textClass ,imgMatch,textMatch;
        let cardDetail = card.split("=");
        console.log(cardDetail[3])
        console.log(cardDetail[1]);
        let cardSize = cardDetail[cardDetail.length - 1].trim();
      
        if(regex.class.test(cardDetail[1])||regex.class.test(cardDetail[3])){
          console.log("hi")
          imageClass = cardDetail[2].split(",")[0];
          textClass = cardDetail[4].split(",")[0];
        }

        return (
          "<div class='col-sm-" +
          cardSize +
          "'>" +
          "<div class='bg-success text-white card'>" +
          "<img class='" +
          `${imageClass}` +
          "' src='" +
          `${cardDetail[1].split(",")[0]}` +
          "' alt='" +
          `${index}` +
          "'>" +
          "</img>" +
          "<div class='card-body'>" +
          "<h5 class='" +
          `${textClass}` +
          "'>" +
          cardDetail[3].split(",")[0] +
          "</h5>" +
          "<button href='#' class='btn btn-success '>Go somewhere</button>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      }) +
      "</div>"
    ).replace(/,/g, " ");
  }
  function createThemeTwoCards(cards){
    return (
      "<div class='row mt-2'>" +
      cards.map((card, index) => {
        console.log(card);
        let imageClass, textClass;
        textClass='text-uppercase text-primary'
        let cardDetail = card.split("=");
        console.log(cardDetail[3].split(',')[0].split('@'));
        let linkList=cardDetail[3].split(',')[0].split('@');
        return (
          "<div class='col-sm-3 '>"+
         "<div class='card h-100'>"+
         "<h5 class='" +
         `${textClass}` +
         "'>" +
         cardDetail[1].split(',')[0] +
         "</h5>" +
         linkList.map((link)=>
          "<a href='#'>"+link+"</a>"+"</br>"
         )+
         "</div>"+
          "</div>"
        );
      }) +
      "</div>"
    ).replace(/,/g, " ");

  }
  function createThemeThreeCard (cards){
    return (
      "<div class='row mt-2'>" +
      cards.map((card, index) => {
        let cardTitle,cardLink,cardDescription;
        let cardDetail = card.split("=");
        console.log(cardDetail);
        if(regex.class.test(cardDetail[1])||regex.class.test(cardDetail[3])||regex.class.test(cardDetail[5])){
          cardTitle=cardDetail[2].split(',')[0];
          cardLink=cardDetail[4].split(',')[0];
          cardDescription=cardDetail[6].split(',')[0]
        }
        return (
          "<div class='col-sm-6'>"+
         "<div class='card h-100'>"+
         "<a href='"+`#/${cardDetail[3].split(',')[0]}`+"' class='"+`${cardTitle}`+`${cardLink}`+"' >"+cardDetail[1].split(',')[0]+"</a>"+
         "<p class='"+`${cardDescription}`+"'>"+cardDetail[5].split('class')[0]+"</p>"+
         "</div>"+
          "</div>"
        );
      }) +
      "</div>"
    ).replace(/,/g, " ");
   
  }
  function renderCardsStage2 (html){
    console.log(html);
    let cardReplaceMatch;
    cardReplaceMatch=regex.commentReplaceMarkup.exec(html);
    console.log(cardReplaceMatch);
    while ((cardReplaceMatch = regex.commentReplaceMarkup.exec(html)) !== null) {
      const cardComment     = cardReplaceMatch[0];
      const cardReplacement = cardReplaceMatch[1] || '';

      html = html.replace(cardComment, () => cardReplacement);
  }

  return html;
  }
  function docsifyCards(hook, vm) {
    let hasCard = false;
    hook.beforeEach(function (content) {
      hasCard = regex.cardGroup.test(content);
      console.log(hasCard)
      if (hasCard) {
        content = renderCardsStage1(content);
      }
      console.log(content)
      return content;
    });
    hook.afterEach(function(html,next){
      if(hasCard){
        html=renderCardsStage2(html)
      }
      next(html);
    })
    // hook.doneEach(function(){
    //   if(hasCard){
        
    //   }
    // })
    // hook.mounted(function(){

    // })
  }
  if (window) {
    $docsify.plugins = [].concat(docsifyCards, $docsify.plugins);
  }
})();
