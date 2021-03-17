//CARDTYPE-1 

//REVISED WITH ICON FOR LINKS

//<!-- cards:start -->
//    INFO=row@cardTheme-1

//      #### IMG= ../_images/logo.png , class= w-25 bg-danger,
//      TXT= third card , class = text-uppercase,
//      LINKTITLE = GET STARTED , class= ,
//      LINKURL = ../../XYZ.md,
//      ICON = fa fa-file mr-1 ,
//      SIZE= 3 ^


//      #### IMG= ../_images/logo.png , class= w-25,
//      TXT= third card , class = text-uppercase,
//      LINKTITLE = GET STARTED , class= ,
//      LINKURL = ../../XYZ.md,
//      ICON =  ,
//      SIZE= 3 ^

//  <!-- cards:end -->


//  CARDTYPE-2
// <!-- cards:start -->
//          INFO=row@cardTheme-2

//         HEADING = Get Started With Studio , class = text-zsn hhjjd,
//         LINKSTitle= signup for free @ Get Started with App creation @ plan a power Apps project , class= text-uppercase text-primary,
//         LINKURL= ../xys.md @ .../xssr.md @ ../nfka.md ,
//         ICON = fa fa-bath mr-1 @ fa fa-home mr-1 @ fa fa-address-book mr-1 ,
//         SIZE = 4 ^
     
//         HEADING = Get Started With Studio , class = ,
//         LINKSTitle= signup for free @ Get Started with App creation @ plan a power Apps project , class= ,
//         LINKURL= ../xys.md @ .../xssr.md @ ../nfka.md ,
//         ICON =  ,
//         SIZE = 4 ^

// <!-- cards:end -->

//CARDTYPE-3

// <!-- cards:start -->
//          INFO=row@cardTheme-3

//         LINKTITLE = Get Started With Studio , class = text-primary,
//         LINKURL =solutions/datasets , class= text-uppercase,
//         ICON = fa fa-bath mr-2 ,
//         DESCRIPTION= Create automated workflows between your favorite apps and services to synchronize files, get notifications, collect data, and more , class=,
//         SIZE = 4 ^
     
//         LINKTITLE = Get Started With Studio , class = text-danger,
//         LINKURL =solutions/modal , class= text-lowercase,
//         ICON = fa fa-bath mr-2 ,
//         DESCRIPTION= Create automated workflows between your favorite apps and services to synchronize files, get notifications, collect data, and more , class= text-danger,
//         SIZE = 4 ^

//         LINKTITLE = Get Started With Studio , class = text-danger,
//         LINKURL =solutions/modal , class= text-lowercase,
//         ICON =  ,
//         DESCRIPTION= Create automated workflows between your favorite apps and services to synchronize files, get notifications, collect data, and more , class= text-primary,
//         SIZE = 5 ^   

// <!-- cards:end -->



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
    allCardsThemeOne: /[\r\n]*(\s)*#{1,6}\s*[A-za-z\s*=]+\s*.*[\r\n]*(\s)*[a-zA-Z\s*]\s*[a-zA-Z\s*]+=\s*[a-zA-Z\s*0-9]+\s*,\s*[a-zA-Z]+\s*=\s*([a-zA-Z-\s*]+)?(,)?[\r\n]*(\s)*[a-zA-Z]+\s*=[a-zA-Z\s*]+\s*,\s*[a-zA-Z]+\s*=\s*([a-zA-Z\s*-]+)?(,)?\s*[\r\n]*(\s)*[a-zA-Z]+\s*=\s*.*[\r\n]*(\s)*[a-zA-Z]+\s*=\s*([a-zA-Z\s*0-9-]+)?\s*,[\r\n]*(\s)*[a-zA-Z]+\s*=\s*[0-9]\s*/gm,
    allCardsThemeTwo:/[\r\n]*(\s)*HEADING\s*=\s*[a-zA-z\s*]+\s*,\s*[a-zA-Z]+\s*=\s*([a-zA-Z-]+\s*,)?(,)?[\r\n]*(\s)*([a-zA-Z-\s*]+)?,[\r\n]*(\s)*[a-zA-Z]+\s*=\s*[a-zA-Z\s*@,]+\s*=\s*([a-zA-Z\s*-]+)?(,)?[\r\n]*(\s)*[a-zA-Z]+\s*=\s*.*[\r\n]*(\s)*[a-zA-Z]+\s*=\s*([a-zA-Z\s*0-9-@]+)?\s*,\s*[\r\n]*(\s)*[a-zA-Z]+\s*=\s*[0-9]\s*/gm,
    allCardsThemeThree:/[\r\n]*(\s)*LINKTITLE\s*=\s*[A-Za-z\s*]+\s*,\s*[a-zA-z]+\s*=\s*([a-zA-Z-]+,)?(,)?[\r\n]*(\s)*[A-Za-z]+\s*=\s*[a-zA-Z\s*]+.*\/[a-zA-Z.]+\s*,\s*[a-zA-Z]+\s*=\s*([a-zA-Z-]+,)?(,)?[\r\n]*(\s)*[a-zA-Z]+\s*=\s*([a-zA-Z\s*0-9-]+)?\s*,[\r\n]*(\s)*[a-zA-Z]+\s*=\s*[a-zA-Z\s*,]+\s*=\s*([a-zA-Z-]+,)?(,)?[\r\n]*(\s)*[a-zA-Z]+\s*=\s*[0-9]\s*/gm,
    class: /[\r\n]*(\s)*class\s*/gm,
  };

  function renderCardsStage1(content) {
    const codeBlockMatch = content.match(regex.codeMarkup) || [];
    const codeBlockMarkers = codeBlockMatch.map((item, i) => {
      const codeMarker = `<!-- ${commentReplaceMark} CODEBLOCK${i} -->`;
      // Replace code block with marker to ensure card markup within code
      // blocks is not processed. These markers are replaced with their
      // associated code blocs after cards have been processed.
      content = content.replace(item, () => codeMarker);

      return codeMarker;
    });
    let arrayGroup=content.match(regex.cardGroup)
  arrayGroup.map((cardGroup,index)=>{
    //get All cards Details
    let cardsInfo=arrayGroup[index].match(regex.cardsInfo)
     let cardType=cardsInfo[0].split('@')[1]
     if(cardType==='cardTheme-1'){
      let cards =  arrayGroup[index].match(regex.allCardsThemeOne) || [];
      let cardDom = createCards(cards);
      content = content.replace(arrayGroup[index],() => cardDom);
     }else if(cardType==='cardTheme-2'){
       let cards=arrayGroup[index].match(regex.allCardsThemeTwo) || [];
        let cardDom=createThemeTwoCards(cards);
        content=content.replace(arrayGroup[index],()=>cardDom)
     }else if(cardType==='cardTheme-3'){
      let cards=arrayGroup[index].match(regex.allCardsThemeThree) || [];
      let cardDom=createThemeThreeCard(cards);
      content=content.replace(arrayGroup[index],()=>cardDom)
     }
   
  })
    return content;
  }

  function createCards(cards) {
    return (
      "<div class='row mt-2'>" +
          cards.map((card, index) => {
            let cardDetail = card.split("=");
            let cardSize = cardDetail[cardDetail.length - 1].trim();
            return (
        "<div class='mt-2 col-sm-" +
              cardSize +
              "'>" +
          "<div class='bg-success text-white card'>" +
              "<img class='" +
              `${cardDetail[2].split(",")[0]}` +
              "' src='" +
              `${cardDetail[1].split(",")[0]}` +
              "' alt='" +
              `${index}` +
              "'>" +
              "</img>" +
            "<div class='card-body'>" +
              "<h5 class='" +
              `${cardDetail[4].split(",")[0]}` +
              "'>" +
              cardDetail[3].split(",")[0] +
              "</h5>" +
              "<div class='row'>"+
                "<div class='col pr-0'>"+
                  "<a href='"+`#/${cardDetail[7].split(',')[0].trim()}`+"' class='"+`${cardDetail[6].split(',')[0]}`+"'>"+cardDetail[5].split(',')[0]+"</a>"+
                "</div>"+
                "<div class='col-xs-2 pl-0 pr-2' align='right'>"+
                  "<a href='"+`#/${cardDetail[7].split(',')[0].trim()}`+"'><i class='text-right"+`${cardDetail[8].split(',')[0]}`+"'></i></a>"+
                "</div>"+
              "</div>"+

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
      cards.map((card) => {
        let cardDetail = card.split("=");
        let linkTitleList=cardDetail[3].split(',')[0].split('@');
        let linkUrlList=cardDetail[5].split(',')[0].split('@');
        let linkIcons=cardDetail[6].split(',')[0].split('@');
        let cardSize = cardDetail[cardDetail.length - 1].trim();
      return (
          "<div class='mt-2 col-sm-" +
          cardSize +
          "'>"+
         "<div class='card'>"+
         "<h5 class='" +
         `${cardDetail[2].split(',')[0]}` +
         "'>" +
         cardDetail[1].split(',')[0] +
         "</h5>" +
         linkTitleList.map((link,linkIndex)=>
         "<div class='row'>"+
              "<div class='col pr-0'>"+
              "<a href='"+`#/${linkUrlList[linkIndex].trim()}`+"' class='"+`${cardDetail[4].split(',')[0]}`+"'>"+link+"</a>"+
              "</div>"+
              "<div class='col-xs-2 pl-0 pr-2' align='right'>"+
                "<a href='"+`#/${linkUrlList[linkIndex].trim()}`+"'><i class='"+`${linkIcons[linkIndex]}`+"'></i></a>"+
              "</div>"+
         "</div>"+
          "</br>"
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
        let cardDetail = card.split("=");
        let cardSize = cardDetail[cardDetail.length - 1].trim();
      return (
          "<div class='mt-2 col-sm-" +
          cardSize +
          "'>"+
         "<div class='card h-100'>"+
         "<div class='row'>"+
         "<div class='col pr-0'>"+
            "<a href='"+`#/${cardDetail[3].split(',')[0].trim()}`+"' class='"+`${cardDetail[2].split(',')[0]}`+`${cardDetail[4].split(',')[0]}`+"' >"+cardDetail[1].split(',')[0]+"</a>"+
         "</div>"+
         "<div class='col-xs-2 pl-0 pr-2' align='right'>"+
            "<a href='"+`#/${cardDetail[3].split(',')[0].trim()}`+"'><i class='"+`${cardDetail[5].split(',')[0]}`+"'></i></a>"+
         "</div>"+
         "</div>"+
         
         "<p class='"+`${cardDetail[7].split(',')[0]}`+"'>"+cardDetail[6].split('class')[0]+"</p>"+
         "</div>"+
          "</div>"
        );
      }) +
      "</div>"
    ).replace(/,/g, " ");
   
  }
  function renderCardsStage2 (html){
   let cardReplaceMatch=regex.commentReplaceMarkup.exec(html);
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
    $docsify.plugins = [].concat(docsifyCards, $docsify.plugins);
  }
})();