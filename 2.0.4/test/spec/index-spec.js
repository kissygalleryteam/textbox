KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('textbox', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','kg/textbox/2.0.1/']});