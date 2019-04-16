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


  $(document)
    .on('click.filter.menu', '[data-toggle="filter-menu"]', function(event) {
      event.preventDefault();
      event.stopPropagation();

      const selector = $(this).data('target');
      const $target = selector ? $(selector) : $(this).parent().children('.filter-menu-m');

      $target.toggleClass('active');
    })
    .on('click.filter.menu', '.filter-menu-m-close', function(event) {
      event.preventDefault();
      event.stopPropagation();

      const $target = $(this).parents('.filter-menu-m');
      $target.removeClass('active');
    });

});