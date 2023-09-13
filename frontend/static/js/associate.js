// const { default: axios } = require("axios");

// import axios from "axios"

const url = "http://127.0.0.1:5000/associate"
const nodes_ls = []
const nodes_cheat = {}
const edges_ls = []
const whole_word = []
let id_count = 0

function start_node(string){

    nodes_ls.push({id: id_count, label: string})
    nodes_cheat[id_count] = string
    whole_word.push(string)
    id_count++

    make_graph()
}

function make_graph(){
    const container = document.getElementById("network");

    const nodes = new vis.DataSet(nodes_ls);

    const edges = new vis.DataSet(edges_ls);

    // ネットワークのオプション
    const options = {};

    console.log(edges_ls)

    // ネットワークの作成
    const network = new vis.Network(container, { nodes, edges }, options);

    network.on("click", (properties) => {
        data_poster(properties.nodes[0])
    })
}

function data_poster(id){
    let words_ls = []
        let flag = true
        words_ls.push(nodes_cheat[id])
        let target = id
        while(flag){
            flag = false
            for(let edge in edges_ls){
                if(edges_ls[edge].to == target){
                    target = edges_ls[edge].from
                    words_ls.push(nodes_cheat[target])
                    flag = true
                    break
                }
            }
        }
        console.log(words_ls)
        let get_post = associate_wrapper(id)
        axios.post(url, {"words" : words_ls, "whole_words": whole_word})
        .then(get_post);
}


function button_click_wrapper(text, node_id){
    let func = () =>{
        nodes_ls.push({id: id_count, label: text})
        edges_ls.push({from: node_id, to: id_count});
        nodes_cheat[id_count] = text
        whole_word.push(text)
        id_count++
        // console.log(text)
        make_graph()
        data_poster(node_id)
    }
    return func
}

function associate_wrapper(id){
    let func = (response) => {
        // console.log(response.data.words)
        const top_five = response.data.words
        word_input(top_five, id);
    }
    return func
}

function word_input(word_ls, node_id){
    
    const container = document.getElementById("interface");
    let button;
    let func;

    container.innerHTML = ""

    for(let word in word_ls){
        button = document.createElement("button")
        button.textContent = word_ls[word];
        func = button_click_wrapper(word_ls[word], node_id)
        button.addEventListener("click", func)
        container.append(button)
    }

    const input_text = document.createElement("input")
    const submit_button = document.createElement("button")
    
    submit_button.textContent = "決定"

    input_text.setAttribute("type", "text");

    submit_button.onclick = () => {
        button_click_wrapper(input_text.value,node_id)()
    }

    container.append(input_text)
    container.append(submit_button)


}


function get_query(){
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('base_name');
    start_node(myParam)
}

window.onload = get_query
