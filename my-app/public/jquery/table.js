function draw_table() {
  $("#results").empty();
  $.getJSONuncached = function (url) {
    return $.ajax({
      url: url,
      type: "GET",
      cache: false,
      success: function (html) {
        $("#results").append(html);
        select_row();
      },
    });
  };
  $.getJSONuncached("/get/html");
}

function select_row() {
  $("#menuTable tbody tr[id]").click(function () {
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    const value = $(this)[0].textContent;
    const onlyValue = value.replace(/[^A-Za-z]/g, " ");
    document.getElementById("itemV").value = onlyValue;
    document.getElementById("priceV").value = value.match(/\d+/)[0];
    var section = $(this).prevAll("tr").children("td[colspan='3']").length - 1;
    var entree = $(this).attr("id") - 1;
    delete_row(section, entree);
    update_row(section, entree, onlyValue, 20);
  });
}

function delete_row(sec, ent) {
  $("#delete").click(function () {
    $.ajax({
      url: "/post/delete",
      type: "POST",
      data: {
        section: sec,
        entree: ent,
      },
      cache: false,
      success: setTimeout(draw_table, 1000),
    });
  });
}
function update_row(sec, ent) {
    $("#update").click(function () {
      $.ajax({
        url: "/post/delete",
        type: "POST",
        data: {
          section: sec,
          entree: ent,
        },
        cache: false,
        success: function (html) {
          setTimeout(draw_table, 1000);
          $.ajax({
            url: "/post/json",
            type: "POST",
            contentType: "json",
            data: {
              item: "updated",
              price: 20,
            },
          });
          draw_table();
        },
      });
    });
}

$(document).ready(function () {
  draw_table();
});
