$(document).ready(function () {

    $("#create").on("click", function () {
        $(".main").empty()
        let count = $("#list").val()
        for (let i = 0; i < count; ++i) {
            let box = $("<div>").html(i).addClass("box center")
            $(".main").append(box)
            box.on("click", function () {
                let question = confirm("Czy usunąć dany element?")
                if (question) {
                    $(this).remove()
                }
            })
        }
    })

    $("#del").on("click", function () {
        $(".main").empty()
    })
})