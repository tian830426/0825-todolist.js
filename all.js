//todolist 邏輯步驟：
//1.先建立基礎html css 畫面
//2.宣告add 按鈕 並進行監聽及取得資料值和宣告
//3.

//宣告:空白<section>
let section = document.querySelector('section');
//宣告：增加按鈕
let add = document.querySelector('form button')

//操作:建立監聽 => 點擊事件  箭頭函式
add.addEventListener(
'click' , e =>{
//取消預設觸發事件
e.preventDefault();
//取值 input
//e.target 取得目前元素位置
let form = e.target.parentElement;
let todoText = form.children[0].value;
let todoMonth = form.children[1].value;
let todoDate = form.children[2].value;
console.log(todoText, todoMonth, todoDate);

//未填寫內容時彈跳視窗
if (todoText === ''){
    alert('please enter some text')
    return ;
}

// create a todo
//創造一個 <div> </div> 
let todo = document.createElement('div');

//給予 <div class="todo">
todo.classList.add('todo');

//div 中創造一個 <ｐ> </ｐ>
let text = document.createElement('p');

//給予 <p class="todo-text">
text.classList.add('todo-text'); 

//將 todoText 內容顯示在瀏覽器上的text <p> 標籤 （替換標籤內容）
text.innerText = todoText;

//div 中創造一個 <ｐ> </ｐ>
let time = document.createElement('p');

//給予 <p class="todo-time">
time.classList.add('todo-time');

//將 todoMonth/todoDate 內容顯示在瀏覽器上的time <p> 標籤 （替換標籤內容）
time.innerText = todoMonth + '/' + todoDate;

// 將內容顯示在瀏覽器畫面上
todo.appendChild(text);
todo.appendChild(time);

//建立一個新的標籤並進行宣告 icon-check
let complete = document.createElement('button');
complete.classList.add('complete');
complete.innerHTML = '<i class="fa-solid fa-check"></i>';
complete.addEventListener('click', e => {
    //宣告todoItem 去取得目前元素的位置
    let todoItem =e.target.parentElement;
    //toggle 這個屬性 可進行隱藏及顯示之間的切換功能(hide() / show())-自定義函數之間的切換
    //設定 可切換功能
    todoItem.classList.toggle('done');
});

//建立一個新標籤並進行宣告 icon-trash
let trash = document.createElement('button');
trash.classList.add('trash');
trash.innerHTML = '<i class="fa-solid fa-trash"></i>';
trash.addEventListener('click', e => {
    //宣告todoItem 去取得目前元素的位置
    let todoItem = e.target.parentElement;

    //設定移除功能
    // todoItem.remove();

    //建立一個監聽事件，讓動畫與移除能夠同步
    todo.addEventListener('animation',()=>{
    //remove from local storage
     let text = todoItem.children[0].innerText;
     let myListArray = JSON.parse(localStorage.getItem('list'));
     myListArray.forEach((item, index)=>{
        if(
            item.todoText == text
        ){
            myListArray.splice(index,1);
            localStorage.setItem('list',JSON.stringify(myListArray));
        }
     })
        todoItem.remove();
    })  
    //設定刪除時消失動畫
    todoItem.style.animation ='scaledown  .5s forwards'; 
})

    //顯示在瀏覽器上
    todo.appendChild(complete);
    todo.appendChild(trash);

    //資料填入的動畫
    todo.style.animation ='scaleup  .5s forwards';

// ---------------------

//取 物件 資料 （網頁資料可以留存）localStorage
//create an object
let myTodo ={
    todoText:todoText,
    todoMonth:todoMonth,
    todoDate:todoDate
};

//localStorage 瀏覽器中的資料庫 getItem('key') (取出資料)
let myList = localStorage.getItem('list');

//localStorage 瀏覽器中的資料庫 setItem('key', value ) (設定資料)
//JSON.stringify :array => string
//JSON.parse :string => array

if(myList == null){
    localStorage.setItem('list',
    JSON.stringify([myTodo]));
}
else{
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem('list', JSON.stringify(myListArray))
}

console.log(JSON.parse(localStorage.getItem('list')));

//資料送出後，當次內容消失
form.children[0].value = '';
section.appendChild(todo);

})

// load data 讓資料重整後除了locailstroage 有紀錄外 畫面同樣留存

loadData();
function loadData(){
let myList = localStorage.getItem('list');
if(myList !== null){
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item => {
    
        //create a todo   
       let todo = document.createElement('div');
       todo.classList.add('todo');

       let text = document.createElement('p');
       text.classList.add('todo-text');
       text.innerText = item.todoText;

       let time = document.createElement('p');
       time.classList.add('todo-time');

       time.innerText = item.todoMonth + '/' + item.todoDate ;

       todo.appendChild(text);
       todo.appendChild(time);

       //新增 icon-check
       let complete = document.createElement('button');
       complete.classList.add('complete');
       complete.innerHTML = '<i class="fa-solid fa-check"></i>';

       complete.addEventListener('click', e =>{
       let todoItem = e.target.parentElement;
       todoItem.classList.toggle('done');
       });  

       //新增 icon-trash
       let trash = document.createElement('button');
       trash.classList.add('trash');
       trash.innerHTML = '<i class="fa-solid fa-trash"></i>';

       trash.addEventListener('click',e => {
       let todoItem = e.target.parentElement;

    //建立一個監聽事件，讓動畫與移除能夠同步
    todoItem.addEventListener('animation ',()=>{
    //remove from local storage
     let text =todoItem.children[0].innerText;
     let myListArray = JSON.parse(localStorage.getItem('list'));
     myListArray.forEach((item, index)=>{
        if(
            item.todoText == text
        ){
            myListArray.splice(index,1);
            localStorage.setItem('list',JSON.stringify(myListArray));
        }
     })
     //移除
        todoItem.remove();
    })
    todoItem.style.animation ='scaledown .5s forwards';

    });
    //顯示在瀏覽器上
    todo.appendChild(complete);
    todo.appendChild(trash);

    section.appendChild(todo);

     //資料填入的動畫
      todoItem.style.animation ='scaleup  .5s forwards';
    
}
)
}
}

// （1）.add()：新增樣式類。
// （2）.item()：返回指定索引的樣式類。
// （3）.remove()：刪除指定樣式類。
// （4）.toggle()：切換樣式類


//資料結構及演算法
//sort algorithm
//merge(合併) sort 

//排序按鈕
// let sort = document.querySelector('.sort')