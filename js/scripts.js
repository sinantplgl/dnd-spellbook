"use strict"

function Spell (params = {}) {
    var self = this
    
    self.getValue = function (val) {
        return ko.isObservable(val) ? val() : val
    }
    
    self.name =  ko.observable(self.getValue(params.name))
    self.subtitle = ko.observable(self.getValue(params.subtitle))
    self.castingTime = ko.observable(self.getValue(params.castingTime))
    self.range = ko.observable(self.getValue(params.range))
    self.components = ko.observable(self.getValue(params.components))
    self.duration = ko.observable(self.getValue(params.duration))
    self.description = ko.observable(self.getValue(params.description))
    self.classes = ko.observable(self.getValue(params.classes))
}


function SpellViewModel(){
    var self = this
    
    self.name = ko.observable()
    
    self.levelList = ko.observableArray(['Cantrip', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
    self.level = ko.observable()
    self.schoolList = ko.observableArray(['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'])
    self.school = ko.observable()
    
    self.timeList = ko.observableArray(['1 action', '1 bonus action', '1 reaction', 'other'])
    self.time = ko.observable()
    self.timeDesc = ko.observable('')
    
    self.range = ko.observable()

    self.verbal = ko.observable(false)
    self.somantic = ko.observable(false)
    self.material = ko.observable(false)
    self.materialDesc = ko.observable("")
    
    self.concentration = ko.observable(false)
    self.durationDesc = ko.observable("")
    self.duration = ko.computed(function () {
        return self.concentration() ? 'Concentration, ' + self.durationDesc() : self.durationDesc()
    })

    self.description = ko.observable()
    
    self.classList = ko.observableArray(["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"])
    self.selectedClasses = ko.observableArray([])
    
    /***** Computed Values *****/
    //Level & School
    self.subtitle = ko.computed(function () {
        var result = self.level()
        if(result == 'Cantrip')
            result = `${self.school()} ${result}`
        else if(result == '1')
            result += `st level ${self.school()}`
        else if(result == '2')
            result += `nd level ${self.school()}`
        else if(result == '3')
            result += `rd level ${self.school()}`
        else
            result += `th level ${self.school()}`
        
        return result
    })
    //Component List
    self.components = ko.computed(function() {
        var result = ''
        if(self.verbal()){
            result += 'V'
            if(self.somantic()){
                result += ', S'
                if(self.material())
                    result += ', M (' + self.materialDesc() + ')'
            }
            else{
                if(self.material())
                    result += ', M (' + self.materialDesc() + ')'
            }
        }
        else{
            if(self.somantic()){
                result += 'S'
                if(self.material())
                    result += ', M (' + self.materialDesc() + ')'
            }
            else{
                if(self.material())
                    result += 'M (' + self.materialDesc() + ')'
            }
        }
        return result                  
    })
    //Class List
    self.classes = ko.pureComputed(function () {
        return self.selectedClasses().join(', ')
    })
    //Casting time
    self.castingTime = ko.computed(function () {
        var result = ''
        if(self.time() == 'other')
            result = self.timeDesc()
        else
            result = self.time()

        return result
    })
    /***** Computed Values END*****/
    
    self.spellList = ko.observableArray([])
    

    
    
    self.addSpell = function () {
        self.spellList.push(new Spell({
            name: self.name,
            subtitle: self.subtitle,
            castingTime: self.castingTime,
            range: self.range,
            components: self.components,
            duration: self.duration,
            description: self.description,
            classes: self.classes
        }))
    }
    self.removeSpell = function() {
        self.spellList.remove(this)
    }
}
ko.applyBindings(new SpellViewModel())