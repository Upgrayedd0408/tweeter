$(document).ready(function() {
  console.log("Document is ready!")

  $(".new-tweet textarea").on("input", function() {
    console.log($(this).val());

    let input = $(this).val();
    let inputLength = input.length;

    let characterCount = 140 - inputLength;

    $(this).closest('form').find('.counter').text(characterCount);

    if(characterCount < 0) {
      $(this).closest('form').find('.counter').addClass('negative');
    } else {
      $(this).closest('form').find('.counter').removeClass('negative');
    }

    })
});