(function () {
  const commentReplaceMark = "cards:replace";
  const regex = {
    codeMarkup: /(```[\s\S]*?```)/gm,

    // Matches tab replacement comment
    // 0: Match
    // 1: Replacement HTML
    commentReplaceMarkup: new RegExp(`<!-- ${commentReplaceMark} (.*) -->`),
    cardGroup: /[\r\n]*(\s*)(<!-+\s+cards:\s*?start\s+-+>)[\r\n]+([\s|\S]*?)[\r\n\s]+(<!-+\s+cards:\s*?end\s+-+>)/m,
    cardsInfo: /[\r\n]*(\s*)<!+-+\s*cards:start\s*-+>[\r\n]*\s*INFO=[A-Za-z]+@[a-zA-Z]+-[0-9]/m,
    allCards: /[\r\n]*(\s)*#{1,6}\s*[a-zA-z=]+\s*([a-zA-Z])=\s*.*[\r\n]*(\s)*[a-zA-Z]+=\s*[a-zA-Z]+(\s)?[a-zA-Z]+\s,\s*[a-zA-z]+\s*=\s*([a-zA-z-]+)?(\s)*,[\r\n]*(\s)*[a-zA-Z]+=\s*[0-9]\s*/gm,
    class: /[\r\n]*(\s)*class\s*/gm,
  };

  function renderCardsStage1(content) {
    let match;
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
    //bug
    cardBlockMatch = regex.cardGroup.exec(content);
    console.log(content.match(regex.cardGroup))
  //   while ((match = regex.cardGroup.exec()) !== null) {
  //     const cardComment     = cardReplaceMatch[0];
  //     const cardReplacement = cardReplaceMatch[1] || '';

  //     html = html.replace(cardComment, () => cardReplacement);
  // }
   
    console.log(cardBlockMatch);
    //get All cards Details
    let cards = content.match(regex.allCards) || [];
    let cardBlock = cardBlockMatch[0];

    let cardStartReplacement = "";
    let cardEndReplacement = "";
    const cardBlockIndent = cardBlockMatch[1];
    if (cardBlock) {
      cardStartReplacement = `<!-- ${commentReplaceMark} <div> -->`;
      cardEndReplacement = `\n${cardBlockIndent}<!-- ${commentReplaceMark} </div> -->`;
      console.log(cardStartReplacement);
      console.log(cardEndReplacement);
    }
    let cardDom = createCards(cards);

    content = content.replace(cardBlockMatch[0], () => cardDom);
    return content;
  }

  function createCards(cards) {
    return (
      "<div class='row'>" +
      cards.map((card, index) => {
        console.log(card);
        let imageClass, textClass;
        let cardDetail = card.split("=");
        console.log(cardDetail);
        console.log(cardDetail[1]);
        let cardSize = cardDetail[cardDetail.length - 1].trim();
        console.log(regex.class.test(cardDetail[1]));
        console.log(regex.class.test(cardDetail[3]));
        if (
          regex.class.test(cardDetail[1] || regex.class.test(cardDetail[3]))
        ) {
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
          "<p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>" +
          "<button href='#' class='btn btn-success '>Go somewhere</button>" +
          "</div>" +
          "</div>" +
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
    // var dom = Docsify.dom;
    $docsify.plugins = [].concat(docsifyCards, $docsify.plugins);
  }
})();
