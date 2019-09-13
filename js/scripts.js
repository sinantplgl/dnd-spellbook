"use strict"

/**** Bootstrap Select ****/
$('.class-picker').selectpicker();
$('.level-picker').selectpicker();
$('.school-picker').selectpicker();
$('.cast-time-picker').selectpicker();
/**** Bootstrap Select END ****/

function Spell (params = {}) {
    var self = this
    
    self.getValue = function (val) {
        return ko.isObservable(val) ? val() : val
    }
    
    self.level =  ko.observable(self.getValue(params.level))
    self.title =  ko.observable(self.getValue(params.title))
    self.type = ko.observable(self.getValue(params.type))
    self.castingTime = ko.observable(self.getValue(params.castingTime))
    self.range = ko.observable(self.getValue(params.range))
    self.components = ko.observable(self.getValue(params.components))
    self.duration = ko.observable(self.getValue(params.duration))
    self.description = ko.observable(self.getValue(params.description))
    self.higherLevels = ko.observable(self.getValue(params.higherLevels))
    self.classes = ko.observable(self.getValue(params.classes))
}


function SpellViewModel(){
    var self = this
    
    self.title = ko.observable()

    self.levelList = ko.observableArray(
        [
            {value: 0, levelName: 'Cantrip'},
            {value: 1, levelName: '1st level'},
            {value: 2, levelName: '2nd level'},
            {value: 3, levelName: '3rd level'},
            {value: 4, levelName: '4th level'},
            {value: 5, levelName: '5th level'},
            {value: 6, levelName: '6th level'},
            {value: 7, levelName: '7th level'},
            {value: 8, levelName: '8th level'},
            {value: 9, levelName: '9th level'}
        ]
    )
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

    self.description = ko.observable()
    self.higherLevels = ko.observable()
    
    self.classList = ko.observableArray(["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"])
    self.selectedClasses = ko.observableArray([])
    
    /***** Computed Values *****/
    //Level & School
    self.type = ko.computed(function () {
        var result = self.level()
        if(result == '0')
            result = `${self.school()} Cantrip`
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
    //Duration
    self.duration = ko.computed(function () {
        return self.concentration() ? 'Concentration, ' + self.durationDesc() : self.durationDesc()
    })
    /***** Computed Values END*****/
    

    //All Spells
    self.spellList = ko.observableArray([])
    $.ajax({
        dataType: 'json',
        url: 'spell-list.json',
        success: function(data){
            self.spellList($.map(data, function(val, i) {
                return new Spell(val)
            }))
        }
    })

    self.addSpell = function () {
        self.spellList.push(new Spell({
            level: self.level,
            title: self.title,
            type: self.type,
            castingTime: self.castingTime,
            range: self.range,
            components: self.components,
            duration: self.duration,
            description: self.description,
            higherLevels: self.higherLevels,
            classes: self.classes
        }))
    }
    self.removeSpell = function() {
        self.spellList.remove(this)
    }
}
ko.applyBindings(new SpellViewModel())