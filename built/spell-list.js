define(["require", "exports", "knockout", "./classes", "bootstrap-select", "datatables.net"], function (require, exports, ko, classes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getValue = function (val) {
        return ko.isObservable(val) ? val() : val;
    };
    class SpellViewModel {
        constructor() {
            this.addSpell = () => {
                // this.spellList.push(new Spell({
                //     level: this.level,
                //     school: this.school,
                //     title: this.title,
                //     type: this.type,
                //     castingTime: this.castingTime,
                //     range: this.range,
                //     components: this.components,
                //     duration: this.duration,
                //     description: this.description,
                //     higherLevels: this.higherLevels,
                //     classes: this.classes
                // }))
            };
            this.removeSpell = (spell) => {
                this.spellList.remove(spell);
            };
            this.parseSchoolName = (school) => {
                switch (school) {
                    case 'A':
                        return 'Abjuration';
                    case 'C':
                        return 'Conjuration';
                    case 'D':
                        return 'Divination';
                    case 'E':
                        return 'Enchantment';
                    case 'I':
                        return 'Illusion';
                    case 'N':
                        return 'Necromancy';
                    case 'T':
                        return 'Transmutation';
                    case 'V':
                        return 'Evocation';
                    default:
                        return '';
                }
            };
            this.parseTimeArray = (arr) => {
                let resultArr = [];
                arr.forEach(element => {
                    resultArr.push(new classes_1.Time(element.number, element.unit, element.condition));
                });
                return resultArr;
            };
            this.parseDuration = (arr) => {
                let resultArr = [];
                arr.forEach(element => {
                    resultArr.push(new classes_1.Duration(element.type, element.duration, element.concentration));
                });
                return resultArr;
            };
            this.parseRange = () => {
            };
            this.parseComponents = (cmp) => {
                let result = { v: false, s: false, m: false };
                if (cmp.v)
                    result.v = true;
                if (cmp.s)
                    result.s = true;
                if (cmp.m)
                    result.m = true;
                return result;
            };
            this.parseMaterials = (cmp) => {
                let materials = "";
                if (typeof (cmp.m) != "undefined") {
                    materials = `${typeof (cmp.m) == "string" ? cmp.m : cmp.m.text}`;
                }
                return materials != "" ? materials : null;
            };
            let self = this;
            this.title = ko.observable("");
            this.level = ko.observable();
            this.schoolList = ko.observableArray(['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation']);
            this.school = ko.observable();
            this.timeList = ko.observableArray(['1 action', '1 bonus action', '1 reaction', 'other']);
            this.time = ko.observable();
            this.timeDesc = ko.observable('');
            this.range = ko.observable();
            this.verbal = ko.observable(false);
            this.somantic = ko.observable(false);
            this.material = ko.observable(false);
            this.materialDesc = ko.observable("");
            this.concentration = ko.observable(false);
            this.durationDesc = ko.observable("");
            this.description = ko.observable();
            this.higherLevels = ko.observable();
            this.classList = ko.observableArray(["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"]);
            this.selectedClasses = ko.observableArray([]);
            this.spellList = ko.observableArray();
            $.ajax({
                dataType: 'json',
                url: 'spells.json',
                success: function (data) {
                    self.spellList($.map(data, function (val, i) {
                        return new classes_1.Spell({
                            name: val.name,
                            level: val.level,
                            school: self.parseSchoolName(val.school),
                            time: self.parseTimeArray(val.time),
                            duration: self.parseDuration(val.duration),
                            components: self.parseComponents(val.components),
                            materials: self.parseMaterials(val.components),
                            source: val.source,
                            page: val.page
                        });
                    }));
                }
            });
            this.title = ko.observable("");
            this.levelList = ko.observableArray([
                { value: 0, levelName: 'Cantrip' },
                { value: 1, levelName: '1st level' },
                { value: 2, levelName: '2nd level' },
                { value: 3, levelName: '3rd level' },
                { value: 4, levelName: '4th level' },
                { value: 5, levelName: '5th level' },
                { value: 6, levelName: '6th level' },
                { value: 7, levelName: '7th level' },
                { value: 8, levelName: '8th level' },
                { value: 9, levelName: '9th level' }
            ]);
            /***** Computed Values *****/
            //Component List
            this.components = ko.computed(function () {
                var result = '';
                if (self.verbal()) {
                    result += 'V';
                    if (self.somantic()) {
                        result += ', S';
                        if (self.material())
                            result += ', M (' + self.materialDesc() + ')';
                    }
                    else {
                        if (self.material())
                            result += ', M (' + self.materialDesc() + ')';
                    }
                }
                else {
                    if (self.somantic()) {
                        result += 'S';
                        if (self.material())
                            result += ', M (' + self.materialDesc() + ')';
                    }
                    else {
                        if (self.material())
                            result += 'M (' + self.materialDesc() + ')';
                    }
                }
                return result;
            });
            //Class List
            this.classes = ko.pureComputed(function () {
                return self.selectedClasses().join(', ');
            });
            //Duration
            this.duration = ko.computed(function () {
                return self.concentration() ? 'Concentration, ' + self.durationDesc() : self.durationDesc();
            });
            /***** Computed Values END*****/
        }
    }
    ko.applyBindings(new SpellViewModel());
    /**** Bootstrap Select ****/
    $('.class-picker').selectpicker();
    $('.level-picker').selectpicker();
    $('.school-picker').selectpicker();
    $('.cast-time-picker').selectpicker();
});
/**** Bootstrap Select END ****/
//$('#spellListTable').DataTable()
//# sourceMappingURL=spell-list.js.map