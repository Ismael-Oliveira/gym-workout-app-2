export abstract class Constants {

    static readonly CONFIG_DATA_TABLES: object = {
        dom: '<"top"B>rt<"bottom"f>rt<"bottom"lp><"clear">',
        lengthMenu: [5, 10, 25, 50, 100],
        pagingType: 'full_numbers',
        processing: true,
        language: {
          search: "Pesquisar",
          emptyTable: "Sem dados disponíveis.",
          lengthMenu: "Exibindo _MENU_ entradas",
          info: "Exibindo de _START_ até _END_, contém: _TOTAL_ entradas",
          paginate: {
            first:      "Primeiro",
            last:       "Ultimo",
            next:       "Próximo",
            previous:   "Anterior"
          },
        }
      }
}