# define Poller class
class Poller

  constructor: (options, @callback) ->
    defaults =
      frequency: 60
      limit: 10
    @config = $.extend defaults, options
    @awesomeBands = [
      'Creed'
      'Godsmack'
      'Hoobastank'
      'Insane Clown Posse'
      'Kid Rock'
      'Limp Bizkit'
      'Mudvayne'
      'Nickelback'
      'Puddle Of Mudd'
      'Staind'
    ]

  getRandomNumber = (min, max) -> Math.floor(Math.random() * (max - min + 1)) + min

  sortData = (data) -> data.sort (a, b) -> b.count - a.count

  getData: -> ({ name: awesomeBand, count: getRandomNumber 0, 2000 } for awesomeBand in @awesomeBands)

  processData: -> sortData(@getData()).slice 0, @config.limit

  start: ->
    @interval = setInterval (=> @callback @processData()), @config.frequency * 1000
    @callback @processData()
    @

  stop: ->
    clearInterval @interval
    @



# namespace
window.massrel ?= { Poller }