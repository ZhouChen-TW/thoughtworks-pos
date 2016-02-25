//TODO: Please write code in this file.
function getitems(inputs,allitems){
    var itemscount=[];
    for(var i=0;i<inputs.length;) {
        var count = 0;
        for (var j = i; j < inputs.length; j++) {
            if (inputs[i] == inputs[j]) {
                count++;
            }
        }
        if(inputs[i].length>10){
            itemscount[inputs[i].substr(0,10)]= parseInt(inputs[i].substr(11));
        }
        itemscount[inputs[i]] = count;
        i += count;
    }
    //console.log(itemscount);
    var items =[];
    for(var key in itemscount){
        for(var i=0;i<allitems.length;i++){
            if(allitems[i].barcode==key){
                allitems[i].count = itemscount[key];
                items.push(allitems[i]);
            }
        }

    }
    return items;
}

function getGifts(cartitems,loadpromotions){
    var giftbarcodes=[];
    var giftitems=[];
    var type = '';
    for(var i=0;i<loadpromotions.length;i++){
        type = loadpromotions[i].type;
        giftbarcodes=loadpromotions[i].barcodes;
        if(type == "BUY_TWO_GET_ONE_FREE"){
            for(var k=0;k<cartitems.length;k++){
                //console.log(cartitems[k].barcode);
                var temp={};
                for(var j=0;j<giftbarcodes.length;j++){
                    if(cartitems[k].barcode == giftbarcodes[j]){
                        temp["barcode"]=cartitems[k].barcode;
                        temp["name"] = cartitems[k].name;
                        temp["unit"] =cartitems[k].unit;
                        temp["count"] =1;
                        giftitems.push(temp);
                    }
                }
            }
        }
    }
    return giftitems;
}

function getitemslast(cartitems,giftitems){
    var cartitemslast =[];
    var itemslast={};
    for(var i=0;i<cartitems.length;i++){
        itemslast = cartitems[i];
        var tempcount = cartitems[i].count;
        var savecount = 0;
        for(var j=0;j < giftitems.length;j++){
            if(giftitems[j].barcode == cartitems[i].barcode ){
                tempcount=tempcount-giftitems[j].count;
                savecount = giftitems[j].count;
            }
        }
        itemslast["total"]=tempcount * cartitems[i].price;
        itemslast["save"]=savecount* cartitems[i].price;
        cartitemslast.push(itemslast);
    }
    return cartitemslast;
}

function getcartlist(cartitemslast){
    var cartlist =[];
    var tempitem ={};
    var total =0;
    var save =0;
    for(var i =0;i<cartitemslast.length;i++){
        total= total + cartitemslast[i].total;
        save =save + cartitemslast[i].save;
    }
    for(var j=0;j<cartitemslast.length;j++){
        tempitem = cartitemslast[j];
        tempitem["allitems_total"] =total;
        tempitem["allitems_save"]=save;
        cartlist.push(tempitem);
    }
    return cartlist;
}

function getText(cartlist,giftitems){
    var outText = "***<没钱赚商店>购物清单***\n";
    for(var i =0;i<cartlist.length;i++){
        outText=outText+"名称："+cartlist[i].name+"，数量："+cartlist[i].count +
            cartlist[i].unit+"，单价："+ cartlist[i].price+"(元)，小计："+cartlist[i].total+"(元)\n";

    }
    outText=outText+"----------------------\n"+"挥泪赠送商品：\n";
    for(var j =0;j< giftitems.length;j++){
        outText =outText+"名称："+ giftitems[j].name +"，数量：" + giftitems[j].count + giftitems[j].unit + "\n";
    }
    outText = outText+'----------------------\n' + '总计：'+cartlist[0].allitems_total+'(元)\n' + '节省：'+cartlist[0].allitems_save+'(元)\n**********************';
    return outText;
}

function printInventory(inputs)
{
    var loadallitesms = loadAllItems();
    var loadpromotions =loadPromotions();
    var cartitems = getitems(inputs,loadallitesms)
    //console.log(cartitems);
    var giftitems = getGifts(cartitems,loadpromotions);
    //console.log(giftitems);
    var cartitemslast = getitemslast(cartitems,giftitems);
    //console.log(cartitemslast);
    var cartlist = getcartlist(cartitemslast);
    //console.log(cartlist);
    var cartText = getText(cartlist,giftitems);
    console.log(cartText);

}
