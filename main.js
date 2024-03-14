const spendingInput = document.querySelector("#spending-input");
const priceInput = document.querySelector("#price-input");
const formBtn = document.querySelector(".btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");

//console.log(spendingInput, priceInput, formBtn);

formBtn.addEventListener("click", addExpence);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

let total = 0;

function updateTotal(price) {
    //total değer ve girilen değeri toplama
    total += Number(price);
    totalInfo.textContent = total;
    // console.log(total)

}


//gider oluşturma

function addExpence(e) {
    e.preventDefault();
    // console.log("tıklandı")

    // console.log(spendingInput.value , priceInput.value)
    if (!priceInput.value || !spendingInput.value) {
        alert("Boş Gider Eklenemez")
        return;
    }
    // 1) kullanıcı veri girdiğinde ve ekleme dediğinde div oluşturma

    const spendingDiv = document.createElement("div");

    // 2) class Ekleme
    spendingDiv.classList.add("spending");

    // console.dir(statusCheck)
    if (statusCheck.checked) {
        spendingDiv.classList.add("payed");
    }

    // 3) içeriğini ayarlama

    spendingDiv.innerHTML =
        ` <h2>${spendingInput.value} =</h2>
   <h2 id="value">${priceInput.value} </h2>
   <div class="buttons">
       <img id="payment" src="images/payment.png" alt="">
       <img id="remove" src="images/delete.png" alt="">
   </div>`
    // 4) listeye eleman ekleme
    list.appendChild(spendingDiv);

    //toplamı güncelleme
    updateTotal(priceInput.value)

    //formu temizleme
    spendingInput.value = "";
    priceInput.value = "";

}

function handleClick(e) {
    const element = e.target
    //console.dir(element)

    if (element.id === "remove") {
        //parentElement: tıklanılan elemanın kapsayıcısına ulaşma
        //(kapsayıcısının kapsayıcısı)
        const wrapper = element.parentElement.parentElement
        // console.log(wrapper)

        //silinen elemanın fiyatını alma
        const deletePrice = wrapper.querySelector("#value").innerText
        Number(deletePrice.innerText);
        //silinenin fiyatını toplamdan çıkarma
        //updateTotal'i güncelleme
        updateTotal(- Number(deletePrice))

        //kapsayıcıyı kaldır
        wrapper.remove()

    }
}

//filtreleme işlemleri
function handleFilter(e) {
    console.log(e.target.value);


    //! child nodes
    //parentElement elementin tersine kapsayıcıya doğru değilde 
    //elemena doğru ilerler

    const items = list.childNodes;
    items.forEach((item) => {
        switch (e.target.value) {
            case "all":
                item.style.display = "flex";
                break;

            case "payed":
                //yalnızca classında "payed" olanlar silinsin
                if (!item.classList.contains("payed")) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
                break;

            case "not-payed":
                if (item.classList.contains("payed")) {
                    item.style.display = "none"
                } else {
                    item.style.display = "flex"
                }
                break;
        }
    });

}