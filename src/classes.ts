"use strict"
import * as ko from "knockout"
export class Time{
    number: Number
    unit: String
    condition: String
    constructor(number: Number, unit: String, condition: String){
        this.number = number
        this.unit = unit
        this.condition = condition
    }

}

class DurationMini{
    type: String
    amount: String
    upTo: boolean

    constructor(type: String, amount: String, upTo: boolean){
        this.type = type != undefined ? type : null
        this.amount = amount != undefined ? amount : null
        this.upTo = upTo != undefined ? upTo : false
    }
}

export class Duration{
    type: String
    duration: DurationMini
    concentration: boolean

    constructor(type: String, duration: any = {}, concentration: boolean = false){
        this.type = type
        
        duration = duration != undefined ? duration : {}
        this.duration = new DurationMini(duration.type, duration.amount, duration.upTo)
        
        this.concentration = concentration != undefined ? concentration : false 
    }
}

export class Spell{
    name: KnockoutObservable<String>
    
    level: KnockoutObservable<Number>
    school: KnockoutObservable<String>
    type: KnockoutComputed<String>
    
    time: KnockoutObservableArray<Time>
    castingTime: KnockoutComputed<String>

    range: KnockoutObservable<any>

    components: KnockoutObservable<any>
    materials: KnockoutObservable<String>

    duration: KnockoutObservableArray<Duration>

    entries: KnockoutObservableArray<any>
    higherLevel: KnockoutObservableArray<any>

    classes: KnockoutObservableArray<String>
    
    source: KnockoutObservable<any>
    page: KnockoutObservable<Number>

    constructor(params: any = {}){
        let self = this
        
        this.name = ko.observable(this.getValue(params.name))
        this.level = ko.observable(this.getValue(params.level))
        this.school = ko.observable(this.getValue(params.school))
        this.time = ko.observableArray(this.getValue(params.time))
        this.range = ko.observable(this.getValue(params.range))
        this.components = ko.observable(this.getValue(params.components))
        this.materials = ko.observable(this.getValue(params.materials))
        this.duration = ko.observableArray(this.getValue(params.duration))
        this.entries = ko.observableArray(this.getValue(params.entries))
        this.higherLevel = ko.observableArray(this.getValue(params.higherLevel))
        this.classes = ko.observableArray(this.getValue(params.classes))
        this.source = ko.observable(this.getValue(params.source))
        this.page = ko.observable(this.getValue(params.page))

        this.type = ko.computed(() => {
            if (self.level() == 0)
                return `${self.school()} Cantrip`
            else if (self.level() == 1)
                return `1st level ${self.school()}`
            else if (self.level() == 2)
                return `2nd level ${self.school()}`
            else if (self.level() == 3)
                return `3rd level ${self.school()}`
            return `${self.level()}th level ${self.school()}`
        })

        this.castingTime = ko.computed(() => {
            let result : String[] = []
            ko.utils.arrayForEach(self.time(), (item, index) => {
                if(item.unit == "bonus")
                    result.push(`${item.number} bonus action`)
                else if(item.unit == "reaction")
                    result.push(`${item.number} reaction ${item.condition}`)
                else
                    result.push(`${item.number} ${item.unit}${item.number > 1 ? 's' : ''}`)
                
            })
            return result.join(' or ')
        })
    }

    private getValue = (val : any) => {
        return ko.isObservable(val) ? val() : val
    }
}