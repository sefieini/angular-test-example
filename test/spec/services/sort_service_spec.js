/**
 * Created by sefi.eini on 7/7/15.
 */
'use strict';

describe('Service: SortService', function () {

    // load the controller's module
    beforeEach(module('mytodoApp'));

    var SortService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, localStorageService, _SortService_) {
        SortService = _SortService_;
    }));

    it('#init', function () {
        expect(SortService.direction).toBe('asc');
        expect(SortService.property).toBe('priority');
        expect(SortService.items).toEqual([]);
    });

    it('#setItems', function () {
        testUtils.expectAlike(SortService.items, []);
        SortService.setItems(['data']);
        testUtils.expectAlike(SortService.items, ['data']);
    });

    describe('#sortBy', function () {
        beforeEach(function(){
            spyOn(SortService, 'sort');
        })
        afterEach(function(){
            expect(SortService.sort).toHaveBeenCalled();
        })
        it('should change direction if same property', function () {
            SortService.sortBy('priority');
            testUtils.expectAlike(SortService.direction, 'desc');
        });

        it('should set property if different and set asc', function () {
            SortService.sortBy('time');
            testUtils.expectAlike(SortService.direction, 'asc');
            testUtils.expectAlike(SortService.property, 'time');
            SortService.sortBy('time');
            testUtils.expectAlike(SortService.direction, 'desc');
            testUtils.expectAlike(SortService.property, 'time');
        });
    });

    describe('#sort', function () {
        it('should set property if different and set asc', function () {
            var testNames = function(array){
                testUtils.expectAlike(SortService.items.map(function(item){ return item.name }), array)
            }
            SortService.setItems([
                {name: '1', priority: 3, time: '02:00'},
                {name: '2', priority: 1, time: '01:00'},
                {name: '3', priority: 2, time: '03:00'},
            ])
            expect(SortService.items[0].name).toBe('1');
            SortService.sortBy('time');
            testNames(['2', '1', '3']);
            SortService.sortBy('time');
            testNames(['3', '1', '2']);

            SortService.sortBy('priority');
            testNames(['2', '3', '1']);
            SortService.sortBy('priority');
            testNames(['1', '3', '2']);
        });
    });

});
