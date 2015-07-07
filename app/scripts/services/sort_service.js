app.service('SortService', [function(){


    this.direction = 'asc';
    this.property = 'priority';
    this.items = [];

    this.setItems = setItems;
    this.sort = sort;
    this.sortBy = sortBy;

    function setItems(items) {
        this.items = items;
        //this.sort(); // AUTO-Sorting
    }

    function sortBy(property){
        if (this.property == property){
            this.direction = (this.direction == 'asc' ? 'desc' : 'asc');
        }else{
            this.property = property;
            this.direction = 'asc';
        }
        this.sort();

    }

    function sort() {
        var property = this.property;
        var direction = this.direction;
        if (!property){
            return;
        }

        this.items = this.items.sort(function(a,b) {
            var aMoreThanB = a[property] > b[property];
            return (direction == 'asc' ? aMoreThanB : !aMoreThanB) });
    }
}]);