require.config({
    paths: {
        "jquery": "externals/jquery-3.4.1",
        "knockout": "externals/knockout-3.5.0",
        "bootstrap": "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min",
        "bootstrap-select": "externals/bootstrap-select.min",
        "datatables.net": "https://cdn.datatables.net/v/bs4/dt-1.10.18/datatables.min"
    },
    "shim": {
        "bootstrap-select": {
            deps: ["bootstrap"]
        }
    }
});
//# sourceMappingURL=require-config.js.map