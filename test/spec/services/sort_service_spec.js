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
    });

});
