// class catalogMenu {
//   constructor() {
//     this.el =
//   }
//   function CatalogMenu() {
//
//   },
//   function add() {
//     new CatalogMenu();
//   }
// };
//
// function catalogMenuToggle() {
//   const $menu = $($(this).data('target'));
//
//   $menu.toggleClass('active');
// }

$(() => {


  $(document).on('click.catalog.menu', '[data-toggle="menu"]', function(event) {
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    const $trigger = $(this);
    const selector = $trigger.data('target');
    const selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function() {
      const $target = $(this);

      // catalogMenu.toggle().call($target);
      $target.toggleClass('active')
    });
  });
});