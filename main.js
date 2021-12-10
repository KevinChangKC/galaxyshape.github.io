
let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
  ];

  let ulBox = document.querySelector('.ticketCard-area');
  let addButton = document.querySelector('.addTicket-btn');
  let searchBar = document.querySelector('.regionSearch');
  let form = document.querySelector('.addTicket-form');

  function addTicket(){

      let error = 0;
      let needReturn = 0;

      let nameValue = document.querySelector('#ticketName').value;
      error = validityInput(nameValue,"#ticketName");
      if(error)
        needReturn++
      let imgUrlValue = document.querySelector('#ticketImgUrl').value;
      error = validityInput(imgUrlValue,"#ticketImgUrl");
      if(error)
        needReturn++
      let areaValue = document.querySelector('#ticketRegion').value;
      error = validityInput(areaValue,"#ticketRegion");
      if(error)
        needReturn++
      let priceValue = document.querySelector('#ticketPrice').value;
      error = validityInput(priceValue,"#ticketPrice");
      if(error)
        needReturn++
      let ticketNumValue = document.querySelector('#ticketNum').value;
      error = validityInput(ticketNumValue,"#ticketNum");
      if(error)
        needReturn++
      let ticketRateValue = document.querySelector('#ticketRate').value;
      error = validityInput(ticketRateValue,"#ticketRate");
      if(error)
        needReturn++
      let ticketDescriptionValue = document.querySelector('#ticketDescription').value;
      error = validityInput(ticketDescriptionValue,"#ticketDescription");
      if(error)
        needReturn++
      
      if( needReturn != 0)
        return;

      let addTicketData = [
      {
        "name": nameValue,
        "imgUrl": imgUrlValue,
        "area": areaValue,
        "price": priceValue,
        "group": ticketNumValue,
        "rate": ticketRateValue,
        "description": ticketDescriptionValue
      }
      ];
      
      data.push(addTicketData[0]);
      renderCards(data,data.length);
      searchBar.value = "全部地區";
      form.reset();
  }

  function searchRegion(data,eventTarget){

      let searchInfo = [[], 0] 

      if(eventTarget.value == "全部地區"){
        searchInfo[0] = data;
        searchInfo[1] = data.length;
        return searchInfo;
      }
      
      searchInfo[0] = data.filter(function(item){
          if(item.area === eventTarget.value)
          searchInfo[1]++;
          return item.area === eventTarget.value; 
      });

      return searchInfo;
  }
  
  //validate
  function validityInput(inputValue, inputValueElement){
     if(inputValue == ""){
        document.querySelector(inputValueElement +'-message').setAttribute("style","display:block;");
        return 1;
     }else{
        document.querySelector(inputValueElement +'-message').setAttribute("style","display:none;"); 
        return 0;
     }
  }

  // Render
  function renderCards(Array,Count){
    ulBox.innerHTML = "";
    Array.forEach(function(value,index,array){
    let htmlTemplate = '<li class="ticketCard"><div class="ticketCard-img"><a href="#"><img src="'+ value.imgUrl +'" alt=""></a><div class="ticketCard-region">'+ value.area +'</div><div class="ticketCard-rank">'+ value.rate +'</div></div><div class="ticketCard-content"><div><h3><a href="#" class="ticketCard-name">'+ value.name +'</a></h3><p class="ticketCard-description">'+ value.description +'</p></div><div class="ticketCard-info"><p class="ticketCard-num"><span><i class="fas fa-exclamation-circle"></i></span>剩下最後 <span id="ticketCard-num"> '+ value.group +' </span> 組</p><p class="ticketCard-price">TWD <span id="ticketCard-price">$'+ value.price +'</span></p></div></div></li>';
    ulBox.innerHTML += htmlTemplate;
    })

    document.querySelector("#searchResult-text").innerHTML = "搜尋資料為" + Count + "筆";
  }

  //initial
  window.onload=function(){

    renderCards(data,data.length);

    addButton.addEventListener("click",function(){
        addTicket();
    });

    searchBar.addEventListener("change",function(e){
        let filterSectionData = searchRegion(data,e.target);
        renderCards(filterSectionData[0],filterSectionData[1]);
    })

  }
