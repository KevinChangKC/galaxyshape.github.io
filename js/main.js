  let data = [];
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
      renderDonutChart(data);
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
    });

    document.querySelector("#searchResult-text").innerHTML = "搜尋資料為" + Count + "筆";
  }

  function renderDonutChart(chatData){
    console.log(chatData[0].area);
    let DonutData = [0,0,0]

    chatData.forEach(function(item){
        if(item.area === "台北")
            DonutData[0]++;
        else if(item.area === "台中")
            DonutData[1]++;
        else if(item.area === "高雄")
            DonutData[2]++;
    });

    let chart = c3.generate({
        data: {
            columns: [
                ['台北', DonutData[0]],
                ['台中', DonutData[1]],
                ['高雄', DonutData[2]],
            ],
            type : 'donut',
        },
        size: {
            width: 200,
            height: 170
        },
        color: {
            pattern: ['#26C0C7', '#5151D3', '#E68618']
        },
        donut: {
            title: "套票地區比重",
            width: 10,
            label: {
                show: false
            }
        }
    });
    
  }

  function init(resData){
    data = resData;  
    renderCards(data,data.length);
    renderDonutChart(data);
  }

  //initial
  window.onload=function(){

    addButton.addEventListener("click",function(){
        addTicket();
    });

    searchBar.addEventListener("change",function(e){
        let filterSectionData = searchRegion(data,e.target);
        renderCards(filterSectionData[0],filterSectionData[1]);
    })
    
    //LV1 get data  
    axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json")
        .then(function(res){
            init(res.data);
    });

    // //LV2 get data  
    //     axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
    //     .then(function(res){
    //         console.log(res);
    //         init(res.data.data);
    // });

  }
