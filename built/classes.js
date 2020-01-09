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
        constructor(params) {
            this.getValue = (val) => {
                return ko.isObservable(val) ? val() : val;
            };
            let self = this;
            this.name = ko.observable(params.name);
            this.level = ko.observable(params.level);
            this.school = ko.observable(params.school);
            this.time = ko.observableArray(params.time);
            this.range = ko.observable(params.range);
            this.components = ko.observable(params.components);
            this.materials = ko.observable(params.materials);
            this.duration = ko.observableArray(params.duration);
            this.entries = ko.observableArray(params.entries);
            this.higherLevel = ko.observableArray(params.higherLevel);
            this.classes = ko.observableArray(params.classes);
            this.source = ko.observable(params.source);
            this.page = ko.observable(params.page);
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
            this.serializedComponents = ko.computed(() => {
                let components = "";
                let c = self.components();
                if (c.v) {
                    components += "V";
                    if (c.s)
                        components += ", S";
                    if (c.m)
                        components += ", M";
                }
                else {
                    if (c.s) {
                        components += "S";
                        if (c.m)
                            components += ", M";
                    }
                    else if (c.m) {
                        components += "M";
                    }
                }
                return self.materials() ? `${components} (${self.materials()})` : components;
            });
        }
    }
    exports.Spell = Spell;
});
//# sourceMappingURL=classes.js.map