function diffClick(btn){
    var result = main(document.getElementById('original').value, document.getElementById('modified').value)
    document.getElementById('result').innerHTML = result.join(' ')
}

function main(str1, str2){
    var strings = checkType(str1,str2)
    var container = strToEqSents(strings.str1, strings.str2)

    var result = []
    for (var index = 0; index < container.sent1.length; index++) {
        result.push(findSentDiff(container.sent1[index],container.sent2[index]))
    }

    return result
}

function strToEqSents(str1, str2){

        var sent1 = str1.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")
        var sent2 = str2.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")

        if (sent1.length > sent2.length){
            var d = sent1.length - sent2.length
            while (d > 0) {
                sent2.push('')
                d -= 1
            }
        }
    
        if (sent2.length > sent1.length){
            var d = sent2.length - sent1.length
            while (d > 0) {
                sent1.push('')
                d -= 1
            }
        }
    
    return {sent1, sent2}
}



function findSentDiff(str1, str2){

    var result = ''

    var str1Container = str1.split(' ')
    var str2Container = str2.split(' ')
    var comp = 0

    if (str1Container.length > str2Container.length){
        var d = str1Container.length - str2Container.length
        comp = d
        while (d > 0) {
            str2Container.push('')
            d -= 1
        }
    }

    if (str2Container.length > str1Container.length){
        var d = str2Container.length - str1Container.length
        while (d > 0) {
            str1Container.push('')
            d -= 1
        }
    }

    var excWord = str2Container.filter(x => !str1Container.includes(x))
    var excWord2 = str1Container.filter(x => !str2Container.includes(x))

    for(ii = 0; ii < str1Container.length; ii++ ){

        if(excWord.includes(str2Container[ii])  && str2Container[ii] !== ''){
            result += '<span class="str-add">'+str2Container[ii]+'</span> ' //something was added
        }else{
            if(str2Container[ii] != undefined){
                result += str2Container[ii] + ' ' //main text
            }
        }
        
        if(excWord2.includes(str1Container[ii + comp]) && str1Container[ii + comp] !== '' ){
            result += '<span class="str-rm">'+str1Container[ii + comp]+'</span> ' //something was deleted
        }
        
    }

    return result
  }

function checkType(str1,str2){
    if (typeof str1 === 'string' && typeof str2 === 'string'){
        return {str1,str2}
    }
    return false
}

window.onload = function() {
    document.getElementById('btn-diff').addEventListener('click',diffClick)
}
