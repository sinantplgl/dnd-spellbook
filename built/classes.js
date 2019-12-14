define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Time {
        constructor(number, unit, condition) {
            this.number = number;
            this.unit = unit;
            this.condition = condition;
        }
    }
    exports.Time = Time;
    class DurationMini {
        constructor(type, amount, upTo) {
            this.type = type != undefined ? type : null;
            this.amount = amount != undefined ? amount : null;
            this.upTo = upTo != undefined ? upTo : false;
        }
    }
    class Duration {
        constructor(type, duration = {}, concentration = false) {
            this.type = type;
            duration = duration != undefined ? duration : {};
            this.duration = new DurationMini(duration.type, duration.amount, duration.upTo);
            this.concentration = concentration != undefined ? concentration : false;
        }
    }
    exports.Duration = Duration;
    class Spell {
        constructor(params = {}) {
            this.getValue = (val) => {
                return ko.isObservable(val) ? val() : val;
            };
            let self = this;
            this.name = ko.observable(this.getValue(params.name));
            this.level = ko.observable(this.getValue(params.level));
            this.school = ko.observable(this.getValue(params.school));
            this.time = ko.observableArray(this.getValue(params.time));
            this.range = ko.observable(this.getValue(params.range));
            this.components = ko.observable(this.getValue(params.components));
            this.materials = ko.observable(this.getValue(params.materials));
            this.duration = ko.observableArray(this.getValue(params.duration));
            this.entries = ko.observableArray(this.getValue(params.entries));
            this.higherLevel = ko.observableArray(this.getValue(params.higherLevel));
            this.classes = ko.observableArray(this.getValue(params.classes));
            this.source = ko.observable(this.getValue(params.source));
            this.page = ko.observable(this.getValue(params.page));
            this.type = ko.computed(() => {
                if (self.level() == 0)
                    return `${self.school()} Cantrip`;
                else if (self.level() == 1)
                    return `1st level ${self.school()}`;
                else if (self.level() == 2)
                    return `2nd level ${self.school()}`;
                else if (self.level() == 3)
                    return `3rd level ${self.school()}`;
                return `${self.level()}th level ${self.school()}`;
            });
            this.castingTime = ko.computed(() => {
                let result = [];
                ko.utils.arrayForEach(self.time(), (item, index) => {
                    if (item.unit == "bonus")
                        result.push(`${item.number} bonus action`);
                    else if (item.unit == "reaction")
                        result.push(`${item.number} reaction ${item.condition}`);
                    else
                        result.push(`${item.number} ${item.unit}${item.number > 1 ? 's' : ''}`);
                });
                return result.join(' or ');
            });
        }
    }
    exports.Spell = Spell;
});
//# sourceMappingURL=classes.js.map