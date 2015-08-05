/**
 * Created by sefi.eini on 7/7/15.
 */
var testUtils = {};
testUtils.alike = function(var_a, var_b){
    return angular.equals(var_a, var_b);
}
testUtils.expectAlike = function(var_a, var_b){
    expect(testUtils.alike(var_a, var_b)).toBe(true);
};