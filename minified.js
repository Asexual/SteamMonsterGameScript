function startAutoClicker(){return autoClicker?void console.log("Autoclicker is already running!"):(autoClicker=setInterval(function(){if(gameRunning()){var e=Math.floor(Math.random()*autoClickerVariance*2)-autoClickerVariance,t=clicksPerSecond+e;g_Minigame.m_CurrentScene.m_nClicks+=t,g_msTickRate=1100;var a=g_Minigame.m_CurrentScene.m_rgGameData.lanes[g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane].active_player_ability_gold_per_click,n=getTarget();if(n&&a>0&&n.m_data.hp>0){var r=n.m_data.gold*a*g_Minigame.m_CurrentScene.m_nClicks;g_Minigame.m_CurrentScene.ClientOverride("player_data","gold",g_Minigame.m_CurrentScene.m_rgPlayerData.gold+r),g_Minigame.m_CurrentScene.ApplyClientOverrides("player_data",!0)}var i=g_Minigame.m_CurrentScene.m_rgStoredCrits.length;if(g_Minigame.m_CurrentScene.m_rgStoredCrits=[],debug){i>1&&console.log("Clicking "+g_Minigame.m_CurrentScene.m_nClicks+" times this second. ("+i+" crits)."),console.log(1==i?"Clicking "+g_Minigame.m_CurrentScene.m_nClicks+" times this second. (1 crit).":"Clicking "+g_Minigame.m_CurrentScene.m_nClicks+" times this second.");var o=g_Minigame.m_CurrentScene.CalculateDamage(g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_per_click*userMaxElementMultiiplier*g_Minigame.m_CurrentScene.m_nClicks),s="(unknown)";o>1e9?s=o/1e9+"B":o>1e6?s=o/1e6+"M":o>1e3&&(s=o/1e3+"K"),console.log("We did roughly "+s+" damage in the last second.")}var l=document.createElement("style");l.type="text/css",l.textContent="#activeinlanecontainer:hover {height:auto;background:rgba(50,50,50,0.9);padding-bottom:10px;position:absolute;z-index:1} #activeinlanecontainer:hover + #activitylog {margin-top:97px} #activitylog {margin-top: 29px}",document.getElementsByTagName("head")[0].appendChild(l)}},autoClickerFreq),void console.log("autoClicker has been started."))}function startAutoUpgradeManager(){function e(){if(debug&&console.log("Checking for worthwhile upgrades"),s=g_Minigame.CurrentScene(),!s.m_bUpgradesBusy&&(-1===u.id&&(a&&$J(document.body).removeClass("upgrade_waiting"),y(!0),M(!0),k()),-1!==u.id&&n&&u.cost<=s.m_rgPlayerData.gold)){var e=$J(".link",document.getElementById("upgr_"+u.id)).get(0);e?s.TryUpgrade(e):console.error("failed to find upgrade")}}if(autoUpgradeManager)return void console.log("UpgradeManager is already running!");var t=30,a=!0,n=!0,r=1,i=[.4,.3,.2,.1],o=clicksPerSecond+Math.ceil(autoClickerVariance/2),s=g_Minigame.CurrentScene(),l=!1,u={id:-1,cost:0},g=[{id:0,level:1},{id:11,level:1},{id:2,level:10},{id:1,level:10}],c=[11,13,16,18,17,14,15,12],m=7,d=[3,4,5,6],p=[],_=[],b=[];Object.keys(s.m_rgTuningData.upgrades).sort(function(e,t){return e-t}).forEach(function(e){var t=s.m_rgTuningData.upgrades[e];switch(t.type){case 0:p.push(+e);break;case 1:_.push(+e);break;case 2:b.push(+e)}});var y=function(){var e=!1;return function(t){return(!e||t)&&(e=d.map(function(e){return{id:e,level:s.GetUpgradeLevel(e)}}).sort(function(e,t){return t.level-e.level})),e}}(),f=function(e){return e=e||y(),s.m_rgTuningData.upgrades[4].multiplier*e.reduce(function(e,t,a){return e+t.level*i[a]},0)},A=function(e){if(!s.bHaveUpgrade(e))return!1;var t=s.m_rgTuningData.upgrades[e],a=t.required_upgrade;if(void 0!==a){var n=t.required_upgrade_level||1;return n<=s.GetUpgradeLevel(a)}return!0},h=function(e,t){var a,n=s.m_rgTuningData.upgrades[e],r=0,i=0,o=s.GetUpgradeLevel(e);void 0===t&&(t=o+1);for(var l=t-o;l>0;l--)r+=n.multiplier,i+=n.cost*Math.pow(n.cost_exponential_base,t-l);var u=n.required_upgrade;if(void 0!==u){var g=h(u,n.required_upgrade_level||1);g.cost>0&&(r+=g.boost,i+=g.cost,a=g.required||u)}return{boost:r,cost:i,required:a}},C=function(){for(var e,t,a={id:-1,cost:0};g.length>0;){if(e=g[0],t=e.id,s.GetUpgradeLevel(t)<e.level){a={id:t,cost:s.GetUpgradeCost(t)};break}g.shift()}return a},S=function(){var e={id:-1,cost:0};return autoBuyAbilities&&c.some(function(t){return A(t)&&s.GetUpgradeLevel(t)<1?(e={id:t,cost:s.GetUpgradeCost(t)},!0):void 0}),e},v=function(){var e,t,a={id:-1,cost:0,hpg:0};return p.forEach(function(n){e=h(n),t=s.m_rgTuningData.player.hp*e.boost/e.cost,t>=a.hpg&&(void 0!==e.required&&(n=e.required),cost=s.GetUpgradeCost(n),(cost<=s.m_rgPlayerData.gold||0===a.cost||cost<a.cost)&&(a={id:n,cost:cost,hpg:t}))}),a},w=function(){var e,t,a,n,i,l={id:-1,cost:0,dpg:0},u=s.m_rgPlayerTechTree.damage_per_click,g=s.m_rgTuningData.player.damage_per_click,c=s.m_rgPlayerTechTree.damage_multiplier_crit,d=Math.min(s.m_rgPlayerTechTree.crit_percentage,1),p=y(),C=f(p);_.forEach(function(t){e=h(t),n=s.m_rgPlayerTechTree.base_dps*e.boost/o/e.cost,n>=l.dpg&&(void 0!==e.required&&(t=e.required),l={id:t,cost:s.GetUpgradeCost(t),dpg:n})}),A(m)&&(t=s.m_rgTuningData.upgrades[m],i=u*d*t.multiplier,a=s.GetUpgradeCost(m),n=i/a,n>=l.dpg&&(l={id:m,cost:a,dpg:n})),b.forEach(function(t){e=h(t),n=g*e.boost*(d*c+(1-d)*C)/e.cost,n>=l.dpg&&(void 0!==e.required&&(t=e.required),l={id:t,cost:s.GetUpgradeCost(t),dpg:n})}),t=s.m_rgTuningData.upgrades[4];var S=p.reduce(function(e,t){return e+t.level},1);a=t.cost*Math.pow(t.cost_exponential_base,S);var v=p.map(function(e){return{level:e.level}}),w=v[r-1].level;if(v[r-1].level++,r>1){var M=v[r-2].level;w>=M&&(v[r-2].level=w+1,v[r-1].level=M)}if(i=u*(1-d)*(f(v)-C),n=i/a,n>l.dpg){var k=p.filter(function(e){return e.level==w});k=k[Math.floor(Math.random()*k.length)].id,l={id:k,cost:a,dpg:n}}return l},M=function(){var e=!1;return function(t){if(e===!1||t){var a=s.m_rgPlayerTechTree.max_hp,n=s.m_rgGameData.lanes.reduce(function(e,t){return Math.max(e,t.enemies.reduce(function(e,t){return e+t.dps},0))},0);e=a/(n||4*s.m_rgGameData.level)}return e}}(),k=function(){if(u=C(),-1===u.id)if(M()<t)u=v();else{var e=w(),n=S();u=e.cost<n.cost||-1===n.id?e:n}-1!==u.id&&(a&&($J(".next_upgrade").removeClass("next_upgrade"),$J(document.getElementById("upgr_"+u.id)).addClass("next_upgrade")),debug&&console.log("next buy:",s.m_rgTuningData.upgrades[u.id].name,"("+FormatNumberForDisplay(u.cost)+")"))},U=function(e,t,a){var n=t+"_upgradeManager";e.prototype[n]||(e.prototype[n]=e.prototype[t]),e.prototype[t]=function(){this[n].apply(this,arguments),a.apply(this,arguments)}};if(U(CSceneGame,"TryUpgrade",function(){this.m_bUpgradesBusy&&(a&&$J(document.body).addClass("upgrade_waiting"),u.id=-1)}),U(CSceneGame,"ChangeLevel",function(){M(!0)<t&&k()}),upgradeManagerPrefilter=function(t,a,n){/ChooseUpgrade/.test(t.url)?n.success(function(){window.setTimeout(e,0)}).fail(function(){s.m_bNeedTechTree=!0,l=!0}):/GetPlayerData/.test(t.url)&&l&&n.success(function(t){var a=g_Server.m_protobuf_GetPlayerDataResponse.decode(t).toRaw(!0,!0);a.tech_tree&&(l=!1,s.m_bUpgradesBusy=!1,window.setTimeout(e,0))})},$J(document.body).removeClass("upgrade_waiting"),$J(".next_upgrade").removeClass("next_upgrade"),a){var P=function(e,t){return"-webkit-"+e+": "+t+"; "+e+": "+t+";"},T=".next_upgrade { "+P("filter","brightness(1.5) contrast(2)")+" }\n.next_upgrade.cantafford { "+P("filter","contrast(1.3)")+" }\n.next_upgrade .info .name, .next_upgrade.element_upgrade .level { color: #e1b21e; }\n#upgrades .next_upgrade .link { "+P("filter","brightness(0.8) hue-rotate(120deg)")+" }\n#elements .next_upgrade .link { "+P("filter","hue-rotate(120deg)")+" }\n.next_upgrade .cost { "+P("filter","hue-rotate(-120deg)")+" }\n.upgrade_waiting .next_upgrade { "+P("animation","blink 1s infinite alternate")+" }\n@-webkit-keyframes blink { to { opacity: 0.5; } }\n@keyframes blink { to { opacity: 0.5; } }",x=document.getElementById("upgradeManagerStyles");x||(x=document.createElement("style"),$J(x).attr("id","upgradeManagerStyles").appendTo("head")),$J(x).html(T)}autoUpgradeManager=setInterval(e,upgradeManagerFreq),console.log("autoUpgradeManager has been started.")}function startAutoRespawner(){return autoRespawner?void console.log("autoRespawner is already running!"):(autoRespawner=setInterval(function(){debug&&console.log("Checking if the player is dead."),g_Minigame.m_CurrentScene.m_bIsDead&&(debug&&console.log("Player is dead. Respawning."),RespawnPlayer())},respawnCheckFreq),void console.log("autoRespawner has been started."))}function startAutoTargetSwapper(){return autoTargetSwapper?void console.log("autoTargetSwapper is already running!"):(updateUserElementMultipliers(),autoTargetSwapperElementUpdate=setInterval(updateUserElementMultipliers,elementUpdateRate),autoTargetSwapper=setInterval(function(){debug&&console.log("Looking for a new target.");var e=getTarget();g_Minigame.m_CurrentScene.m_rgEnemies.each(function(t){compareMobPriority(t,e)&&(e=t)});var t=getTarget();e.m_data&&t.m_data&&e.m_data.id!=t.m_data.id?(debug&&null!==swapReason&&(console.log(swapReason),swapReason=null),g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane!=e.m_nLane&&g_Minigame.m_CurrentScene.TryChangeLane(e.m_nLane),g_Minigame.m_CurrentScene.TryChangeTarget(e.m_nID)):e.m_data&&g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane!=e.m_nLane&&g_Minigame.m_CurrentScene.TryChangeLane(e.m_nLane)},targetSwapperFreq),void console.log("autoTargetSwapper has been started."))}function startAutoAbilityUser(){return autoAbilityUser?void console.log("autoAbilityUser is already running!"):(autoAbilityUser=setInterval(function(){debug&&console.log("Checking if it's useful to use an ability.");var e=g_Minigame.CurrentScene().m_rgPlayerData.hp/g_Minigame.CurrentScene().m_rgPlayerTechTree.max_hp*100,t=getTarget(),a=g_Minigame.m_CurrentScene.m_rgGameData.lanes[g_Minigame.CurrentScene().m_rgPlayerData.current_lane];if(t){var n=t.m_data.hp/t.m_data.max_hp*100,r=g_Minigame.m_CurrentScene.m_rgLaneData[g_Minigame.CurrentScene().m_rgPlayerData.current_lane].friendly_dps,i=t.m_data.hp/r,o=g_Minigame.m_CurrentScene.m_nCurrentLevel+1>=nukeBossesAfterLevel&&(g_Minigame.m_CurrentScene.m_nCurrentLevel+1)%farmGoldOnBossesLevelDiff!==0,s=2==t.m_data.type||t.m_data.type===!1;if(0===t.m_data.type&&g_Minigame.m_CurrentScene.m_nCurrentLevel+1>=nukeBossesAfterLevel||s&&o){var l=hasAbility(5),u=hasAbility(6),g=hasAbility(18)&&autoUseConsumables;if(n>=90&&autoUseConsumables&&(hasAbility(14)||hasAbility(15)))hasAbility(14)?castAbility(14):hasAbility(15)&&castAbility(15);else if(l||g||u){var c=abilityIsUnlocked(5),m=abilityIsUnlocked(6);if(!c&&!g||!m||(l||g)&&(u||!m)){var d=currentLaneHasAbility(9);(n>=70||d&&n>=60)&&(d||hasAbility(9)||!abilityIsUnlocked(9)||abilityCooldown(9)>60)&&(hasAbility(9)&&!currentLaneHasAbility(9)?(debug&&console.log("Triggering Decrease Cooldown!"),castAbility(9)):(g?(debug&&console.log("Using Crit!"),castAbility(18)):l&&(debug&&console.log("Casting Morale Booster!"),castAbility(5)),u&&(debug&&console.log("Casting Good Luck Charm!"),castAbility(6))))}}hasAbility(10)&&(n>=useNukeOnSpawnerAbovePercent||2==t.m_data.type&&n>=useNukeOnBossAbovePercent)?(debug&&console.log("Nuclear launch detected."),castAbility(10)):0===t.m_data.type&&hasAbility(12)&&n>=useNukeOnSpawnerAbovePercent&&a.enemies.length>=4?(debug&&console.log("Triggering napalm!"),castAbility(12)):0===t.m_data.type&&hasAbility(11)&&n>=useNukeOnSpawnerAbovePercent&&a.enemies.length>=4&&(debug&&console.log("Triggering cluster bomb!"),castAbility(11)),s&&(hasAbility(16)&&autoUseConsumables&&n>useNukeOnBossAbovePercent&&(debug&&console.log("Using Max Elemental Damage on boss."),castAbility(16)),hasAbility(24)&&autoUseConsumables&&n>useNukeOnBossAbovePercent&&(debug&&console.log("Using Reflect Damage on boss."),castAbility(24)))}else!o&&s&&hasAbility(17)&&autoUseConsumables&&n>useRainingGoldAbovePercent&&(debug&&console.log("Using Raining Gold on boss."),castAbility(17));var p=hasAbility(22)&&autoUseConsumables;(s||4==t.m_data.type)&&10>i&&(hasAbility(8)||p)&&(p?(debug&&console.log("Using Metal Detector via Treasure."),castAbility(22)):(debug&&console.log("Using Metal Detector."),castAbility(8)))}for(var _=0,b=0,y=1;10>y;y++){var f=10*(y-1)+5;_+=f*a.player_hp_buckets[y],b+=a.player_hp_buckets[y]}var A=_/b,h=b/(b+a.player_hp_buckets[0])*100;if((useMedicsAtPercent>=e||useMedicsAtLanePercent>=A&&h>useMedicsAtLanePercentAliveReq)&&!g_Minigame.m_CurrentScene.m_bIsDead){debug&&(useMedicsAtPercent>=e&&console.log("Health below threshold. Need medics!"),useMedicsAtLanePercent>=A&&h>useMedicsAtLanePercentAliveReq&&console.log("Average lane below threshold. Need medics!"));var C=hasAbility(19)&&autoUseConsumables,S=hasAbility(23)&&autoUseConsumables;(hasAbility(7)||C)&&currentLaneHasAbility(7)<2?C?(debug&&console.log("Using Medics via Pumped Up!"),castAbility(19)):(debug&&console.log("Using Medics!"),castAbility(7)):S&&useMedicsAtPercent>=e?(debug&&console.log("Using Steal Health in place of Medics!"),castAbility(23)):debug&&console.log("No medics to unleash!")}if(hasAbility(13)&&autoUseConsumables&&a.player_hp_buckets[0]>=useResurrectToSaveCount&&(debug&&console.log("Using resurrection to save "+a.player_hp_buckets[0]+" lane allies."),castAbility(13)),hasAbility(27)&&autoUseConsumables){var v=0;for(y=5;12>=y;y++)abilityIsUnlocked(y)&&(v+=abilityCooldown(y));1e3*v>=useLikeNewAboveCooldown&&(debug&&console.log("Using resurrection to save a total of "+v+" seconds of cooldown."),castAbility(27))}},abilityUseCheckFreq),void console.log("autoAbilityUser has been started."))}function startAutoItemUser(){autoUseConsumables=!0,console.log("Automatic use of consumables has been enabled.")}function startAllAutos(){startAutoClicker(),startAutoRespawner(),startAutoTargetSwapper(),startAutoAbilityUser(),startAutoUpgradeManager()}function stopAutoClicker(){autoClicker?(clearInterval(autoClicker),autoClicker=null,console.log("autoClicker has been stopped.")):console.log("No autoClicker is running to stop.")}function stopAutoRespawner(){autoRespawner?(clearInterval(autoRespawner),autoRespawner=null,console.log("autoRespawner has been stopped.")):console.log("No autoRespawner is running to stop.")}function stopAutoTargetSwapper(){autoTargetSwapper?(clearInterval(autoTargetSwapper),autoTargetSwapper=null,console.log("autoTargetSwapper has been stopped.")):console.log("No autoTargetSwapper is running to stop.")}function stopAutoAbilityUser(){autoAbilityUser?(clearInterval(autoAbilityUser),autoAbilityUser=null,console.log("autoAbilityUser has been stopped.")):console.log("No autoAbilityUser is running to stop.")}function stopAutoItemUser(){autoUseConsumables=!1,console.log("Automatic use of consumables has been disabled.")}function stopAutoUpgradeManager(){if(autoUpgradeManager){clearInterval(autoUpgradeManager),autoUpgradeManager=null;var e=function(e,t){e.prototype[t]=e.prototype[t+"_upgradeManager"]||e.prototype[t]};e(CSceneGame,"TryUpgrade"),e(CSceneGame,"ChangeLevel"),$J(document.body).removeClass("upgrade_waiting"),$J(".next_upgrade").removeClass("next_upgrade"),console.log("autoUpgradeManager has been stopped.")}else console.log("No autoUpgradeManager is running to stop.")}function stopAllAutos(){stopAutoClicker(),stopAutoRespawner(),stopAutoTargetSwapper(),stopAutoAbilityUser(),stopAutoItemUser(),stopAutoUpgradeManager()}function disableAutoNukes(){useNukeOnSpawnerAbovePercent=200,console.log("Automatic nukes have been disabled")}function castAbility(e){hasAbility(e)&&(12>=e&&null!==document.getElementById("ability_"+e)?g_Minigame.CurrentScene().TryAbility(document.getElementById("ability_"+e).childElements()[0]):null!==document.getElementById("abilityitem_"+e)&&g_Minigame.CurrentScene().TryAbility(document.getElementById("abilityitem_"+e).childElements()[0]))}function currentLaneHasAbility(e){return laneHasAbility(g_Minigame.CurrentScene().m_rgPlayerData.current_lane,e)}function laneHasAbility(e,t){try{return g_Minigame.m_CurrentScene.m_rgLaneData[e].abilities[t]?g_Minigame.m_CurrentScene.m_rgLaneData[e].abilities[t]:0}catch(a){return 0}}function abilityIsUnlocked(e){return 12>=e?(1<<e&g_Minigame.CurrentScene().m_rgPlayerTechTree.unlocked_abilities_bitfield)>0:getAbilityItemQuantity(e)>0}function getAbilityItemQuantity(e){for(var t=0;t<g_Minigame.CurrentScene().m_rgPlayerTechTree.ability_items.length;++t){var a=g_Minigame.CurrentScene().m_rgPlayerTechTree.ability_items[t];if(a.ability==e)return a.quantity}return 0}function abilityCooldown(e){return g_Minigame.CurrentScene().GetCooldownForAbility(e)}function hasAbility(e){return abilityIsUnlocked(e)&&abilityCooldown(e)<=0}function updateUserElementMultipliers(){gameRunning()&&g_Minigame.m_CurrentScene.m_rgPlayerTechTree&&(userElementMultipliers[3]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_air,userElementMultipliers[4]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_earth,userElementMultipliers[1]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_fire,userElementMultipliers[2]=g_Minigame.m_CurrentScene.m_rgPlayerTechTree.damage_multiplier_water,userMaxElementMultiiplier=Math.max.apply(null,userElementMultipliers))}function getMobTypePriority(e){if(!e||!e.m_data)return-1;switch(mobType=e.m_data.type){case 1:return 0;case 0:return 1;case 3:return 2;case 2:return 3;case 4:return 4;case!1:return 4;default:return-1}}function compareMobPriority(e,t){if(!e)return!1;if(!t)return swapReason="Swapping off a non-existent mob.",!0;var a=g_Minigame.CurrentScene().m_rgPlayerData.hp/g_Minigame.CurrentScene().m_rgPlayerTechTree.max_hp*100,n=laneHasAbility(e.m_nLane,7)||laneHasAbility(e.m_nLane,23),r=laneHasAbility(t.m_nLane,7)||laneHasAbility(t.m_nLane,23),i=laneHasAbility(e.m_nLane,17),o=laneHasAbility(t.m_nLane,17),s=getMobTypePriority(e),l=getMobTypePriority(t),u=userElementMultipliers[g_Minigame.m_CurrentScene.m_rgGameData.lanes[e.m_nLane].element],g=userElementMultipliers[g_Minigame.m_CurrentScene.m_rgGameData.lanes[t.m_nLane].element];laneHasAbility(e.m_nLane,16)&&(u=userMaxElementMultiiplier),laneHasAbility(t.m_nLane,16)&&(g=userMaxElementMultiiplier);var c=e.m_data.hp,m=t.m_data.hp;if(e.m_bIsDestroyed||0>=c)return!1;if(t.m_bIsDestroyed||0>=m)return swapReason="Swapping off a destroyed mob.",!0;if(i!=o){if(i>o&&(3==t.m_data.type||1==t.m_data.type))return swapReason="Switching to target with Raining Gold.",!0}else if(s!=l){if(s>l)return swapReason="Switching to higher priority target.",!0}else if(seekHealingPercent>=a&&!g_Minigame.m_CurrentScene.m_bIsDead){if(n!=r&&n)return swapReason="Swapping to lane with active healing.",!0}else if(u!=g){if(u>g)return swapReason="Switching to elementally weaker target.",!0}else if(c!=m&&m>c)return swapReason="Switching to lower HP target.",!0;return!1}function gameRunning(){try{return"object"==typeof g_Minigame&&2==g_Minigame.m_CurrentScene.m_rgGameData.status}catch(e){return!1}}function addPointer(){g_Minigame.m_CurrentScene.m_rgFingerTextures=[];for(var e=26,t=49,a=0;4>a;a++)for(var n=0;5>n;n++)g_Minigame.m_CurrentScene.m_rgFingerTextures.push(new PIXI.Texture(g_rgTextureCache.pointer.texture,{x:n*e,y:a*t,width:e,height:t}));g_Minigame.m_CurrentScene.m_nFingerIndex=0,g_Minigame.m_CurrentScene.m_spriteFinger=new PIXI.Sprite(g_Minigame.m_CurrentScene.m_rgFingerTextures[g_Minigame.m_CurrentScene.m_nFingerIndex]),g_Minigame.m_CurrentScene.m_spriteFinger.scale.x=g_Minigame.m_CurrentScene.m_spriteFinger.scale.y=2,g_Minigame.m_CurrentScene.m_containerParticles.addChild(g_Minigame.m_CurrentScene.m_spriteFinger)}function getTarget(){try{var e=g_Minigame.m_CurrentScene.GetEnemy(g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane,g_Minigame.m_CurrentScene.m_rgPlayerData.target);return e}catch(t){return null}}function updatePlayersInLane(){var e="???";g_Minigame.m_CurrentScene.m_rgLaneData[g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane]&&(e=g_Minigame.m_CurrentScene.m_rgLaneData[g_Minigame.m_CurrentScene.m_rgPlayerData.current_lane].players),$J("#players_in_lane").html(e)}function updatePlayersInRoom(){var e="???";g_Minigame.m_CurrentScene.m_rgLaneData[0]&&(e=g_Minigame.m_CurrentScene.m_rgLaneData[0].players+g_Minigame.m_CurrentScene.m_rgLaneData[1].players+g_Minigame.m_CurrentScene.m_rgLaneData[2].players),$J("#players_in_room").html(e)}function initEndDate(){var e=new Date;return e.setUTCDate(e.getDate()+1),e.setUTCHours(16,0,0,0),e}function updateStats(){var e=function(){return endDate.getTime()/1e3-g_Minigame.m_CurrentScene.m_nTime},t=function(){return(g_Minigame.m_CurrentScene.m_rgGameData.timestamp-g_Minigame.m_CurrentScene.m_rgGameData.timestamp_game_start)/g_Minigame.m_CurrentScene.m_rgGameData.level},a=function(){var t=e(),a=Math.floor(t/3600),n=Math.floor((t-3600*a)/60),r=t-3600*a-60*n,i="";return a>0?(i+=1==a?"an hour":a+" hours",n>1&&(i+=" and "+n+" minute"+(1==n?"":"s"))):n>0?(i+=1==n?"a minute":n+" minutes",r>1&&(i+=" and "+r+" second"+(1==r?"":"s"))):i+=1>=r?"about a second":"about "+r+" seconds",i};$J("#avg_completion_rate").html(parseFloat(t()).toFixed(2)),$J("#estimated_end_level").html(Math.round(e()/t()+g_Minigame.m_CurrentScene.m_rgGameData.level)),$J("#remaining_time").html(a())}function addExtraUI(){addCustomButtons();var e=$J(".title_activity").html();$J(".title_activity").html(e+'&nbsp;[<span id="players_in_room">0</span> in room]'),customCSS()}function addCustomButtons(){$J('<div style="height: 52px; position: absolute; bottom: 85px; left: 828px; z-index: 12;" onclick="SmackTV();"><br><br><span style="font-size:10px; padding: 12px; color: gold;">Smack TV</span></div>').insertBefore("#row_bottom"),$J(".leave_game_btn").css({width:"125px","background-position":"-75px 0px",position:"absolute",bottom:"144px","z-index":"12",left:"340px"}),$J(".leave_game_helper").css({left:"150px",top:"-75px","z-index":"12"}),$J(".leave_game_btn").html('<span style="padding-right: 50px;">Close</span><br><span style="padding-right: 50px;">Game</span>'),$J(".toggle_music_btn").click(toggleMusic).attr("id","toggleMusicBtn"),$J("#toggleMusicBtn").html("<span>"+(WebStorage.GetLocal("minigame_mutemusic")?"Enable":"Disable")+" Music</span>"),$J(".toggle_sfx_btn").click(toggleSFX).attr("id","toggleSFXBtn"),$J("#toggleSFXBtn").html("<span>"+(WebStorage.GetLocal("minigame_mute")?"Enable":"Disable")+" SFX</span>"),$J("#toggleMusicBtn").after('<span id="toggleAllSoundBtn" class="toggle_music_btn" style="display:inline-block;"><span>'+(bIsMuted()?"Enable":"Disable")+" All Sound</span></span>"),$J("#toggleAllSoundBtn").click(toggleAllSound),$J(".game_options").after('<div class="game_options" id="auto_options"></div>'),$J("#auto_options").append('<span id="toggleAutoClickerBtn" class="toggle_music_btn toggle_btn enabled" style="display:inline-block;margin-left:6px"><span>AutoClicker</span><br /><span class="status">Enabled</span></span>'),$J("#toggleAutoClickerBtn").click(toggleAutoClicker),$J("#auto_options").append('<span id="toggleAutoTargetSwapperBtn" class="toggle_music_btn toggle_btn enabled" style="display:inline-block;"><span>Target Swap</span><br /><span class="status">Enabled</span></span>'),$J("#toggleAutoTargetSwapperBtn").click(toggleAutoTargetSwapper),$J("#auto_options").append('<span id="toggleAutoAbilityUserBtn" class="toggle_music_btn toggle_btn enabled" style="display:inline-block;"><span>Ability/Item Use</span><br /><span class="status">Enabled</span></span>'),$J("#toggleAutoAbilityUserBtn").click(toggleAutoAbilityUser),$J("#auto_options").append('<span id="toggleAutoItemUserBtn" class="toggle_music_btn toggle_btn enabled" style="display:inline-block;"><span>Auto Consumable Use</span><br /><span class="status">Enabled</span></span>'),$J("#toggleAutoItemUserBtn").click(toggleAutoItemUser),$J("#auto_options").append('<span id="toggleAutoUpgradeBtn" class="toggle_music_btn toggle_btn enabled" style="display:inline-block;"><span>Upgrader</span><br /><span class="status">Enabled</span></span>'),$J("#toggleAutoUpgradeBtn").click(toggleAutoUpgradeManager),$J("#auto_options").append('<span id="toggleSpammerBtn" class="toggle_music_btn toggle_btn disabled" style="display:inline-block;"><span>Particle Spam</span><br /><span class="status">Disabled</span></span>'),$J("#toggleSpammerBtn").click(toggleSpammer);var e=document.querySelector(".breadcrumbs");if(e){var t=document.createElement("span");t.textContent=" > ",e.appendChild(t),t=document.createElement("span"),t.style.color="#D4E157",t.style.textShadow="1px 1px 0px rgba( 0, 0, 0, 0.3 )",t.textContent="Room "+g_GameID,e.appendChild(t),t=document.createElement("span"),t.textContent=" > ",e.appendChild(t),t=document.createElement("span"),t.style.color="#F089B2",t.style.textShadow="1px 1px 0px rgba( 0, 0, 0, 0.3 )",t.innerHTML='Expected Level: <span id="estimated_end_level">0</span>, Seconds Per Level <span id="avg_completion_rate">0</span>',e.appendChild(t),t=document.createElement("span"),t.textContent=" > ",e.appendChild(t),t=document.createElement("span"),t.style.color="#ACA5F2",t.style.textShadow="1px 1px 0px rgba( 0, 0, 0, 0.3 )",t.innerHTML='Remaining Time: <span id="remaining_time">0 Seconds</span>.',e.appendChild(t),updateStats(),setTimeout(function(){updateStats()},1e4),"undefined"!=typeof GM_info&&(t=document.createElement("span"),t.style.cssFloat="right",t.style.color="#D4E157",t.style.textShadow="1px 1px 0px rgba( 0, 0, 0, 0.3 )",t.innerHTML='<a href="'+GM_info.namespace+'">'+GM_info.script.name+" v"+GM_info.script.version+"</a>",e.appendChild(t))}}function addGlobalStyle(e){$J("head").append("<style>"+e+"</style>")}function customCSS(){addGlobalStyle(".game_options .toggle_btn { background: url('https://raw.githubusercontent.com/ensingm2/SteamMonsterGameScript/master/button_icons.png');background-repeat: no-repeat;background-position: 0px 0px;cursor: pointer;width: 150px;height: 21px;}"),addGlobalStyle(".game_options .toggle_btn.enabled {background: url('https://raw.githubusercontent.com/ensingm2/SteamMonsterGameScript/master/button_icons.png');background-repeat: no-repeat;background-position: 0px -56px;cursor: pointer;height: 21px;}"),addGlobalStyle(".game_options .toggle_btn.disabled {background: url('https://raw.githubusercontent.com/ensingm2/SteamMonsterGameScript/master/button_icons.png');background-repeat: no-repeat;background-position: 0px -112px;cursor: pointer;height: 21px; }"),addGlobalStyle(".game_options .toggle_btn:hover { background: url('https://raw.githubusercontent.com/ensingm2/SteamMonsterGameScript/master/button_icons.png');background-repeat: no-repeat;background-repeat: no-repeat;background-position: -150px 0px;color: #fff;}"),addGlobalStyle(".game_options .toggle_btn.enabled:hover { background: url('https://raw.githubusercontent.com/ensingm2/SteamMonsterGameScript/master/button_icons.png');background-repeat: no-repeat;background-position: -150px -56px;color: #fff; }"),addGlobalStyle(".game_options .toggle_btn.disabled:hover { background: url('https://raw.githubusercontent.com/ensingm2/SteamMonsterGameScript/master/button_icons.png');background-repeat: no-repeat;background-position: -150px -112px;color: #fff;}"),addGlobalStyle(".game_options .toggle_btn span { position: relative; top: -20px; }")}function toggleSFX(){var e=WebStorage.GetLocal("minigame_mute");e?WebStorage.SetLocal("minigame_mute",!0):WebStorage.SetLocal("minigame_mute",!1),updateSoundBtnText()}function toggleMusic(){var e=WebStorage.GetLocal("minigame_mutemusic");e?(WebStorage.SetLocal("minigame_mutemusic",!0),g_AudioManager.m_eleMusic.pause()):(WebStorage.SetLocal("minigame_mutemusic",!1),g_AudioManager.m_eleMusic.play()),updateSoundBtnText()}function toggleAllSound(){bIsMuted()?(WebStorage.SetLocal("minigame_mute",!1),WebStorage.SetLocal("minigame_mutemusic",!1),g_AudioManager.m_eleMusic.play()):(WebStorage.SetLocal("minigame_mute",!0),WebStorage.SetLocal("minigame_mutemusic",!0),g_AudioManager.m_eleMusic.pause()),updateSoundBtnText()}function updateSoundBtnText(){$J("#toggleSFXBtn").html("<span>"+(WebStorage.GetLocal("minigame_mute")?"Enable":"Disable")+" SFX</span>"),$J("#toggleMusicBtn").html("<span>"+(WebStorage.GetLocal("minigame_mutemusic")?"Enable":"Disable")+" Music</span>"),$J("#toggleAllSoundBtn").html("<span>"+(bIsMuted()?"Enable":"Disable")+" All Sound</span>")}function toggleAutoClass(e,t){t?($J(e).addClass("enabled"),$J(e).removeClass("disabled"),$J(e+" .status").html("Enabled")):($J(e).removeClass("enabled"),$J(e).addClass("disabled"),$J(e+" .status").html("Disabled"))}function toggleAutoClicker(){autoClicker?(stopAutoClicker(),toggleAutoClass("#toggleAutoClickerBtn",!1)):(startAutoClicker(),toggleAutoClass("#toggleAutoClickerBtn",!0))}function toggleAutoTargetSwapper(){autoTargetSwapper?(stopAutoTargetSwapper(),toggleAutoClass("#toggleAutoTargetSwapperBtn",!1)):(startAutoTargetSwapper(),toggleAutoClass("#toggleAutoTargetSwapperBtn",!0))}function toggleAutoAbilityUser(){autoAbilityUser?(stopAutoAbilityUser(),toggleAutoClass("#toggleAutoAbilityUserBtn",!1)):(startAutoAbilityUser(),toggleAutoClass("#toggleAutoAbilityUserBtn",!0))}function toggleAutoItemUser(){autoUseConsumables?(stopAutoItemUser(),toggleAutoClass("#toggleAutoItemUserBtn",!1)):(startAutoItemUser(),toggleAutoClass("#toggleAutoItemUserBtn",!0))}function toggleAutoUpgradeManager(){autoUpgradeManager?(stopAutoUpgradeManager(),toggleAutoClass("#toggleAutoUpgradeBtn",!1)):(startAutoUpgradeManager(),toggleAutoClass("#toggleAutoUpgradeBtn",!0))}function spamNoClick(){var e=g_Minigame.m_CurrentScene.m_nClicks;g_Minigame.m_CurrentScene.DoClick({data:{getLocalPosition:function(){var e=getTarget(),t=440*e.m_nLane;return{x:e.m_Sprite.position.x-t,y:e.m_Sprite.position.y-52}}}}),g_Minigame.m_CurrentScene.m_nClicks=e}function toggleSpammer(){spammer?(clearInterval(spammer),spammer=null,toggleAutoClass("#toggleSpammerBtn",!1)):confirm("Are you SURE you want to do this? This leads to massive memory leaks fairly quickly.")&&(spammer=setInterval(spamNoClick,1e3/clicksPerSecond),toggleAutoClass("#toggleSpammerBtn",!0))}var debug=!1,clicksPerSecond=g_TuningData.abilities[1].max_num_clicks,autoClickerVariance=Math.floor(clicksPerSecond/10);clicksPerSecond-=Math.ceil(autoClickerVariance/2);var respawnCheckFreq=5e3,targetSwapperFreq=1e3,abilityUseCheckFreq=2e3,itemUseCheckFreq=5e3,seekHealingPercent=20,upgradeManagerFreq=5e3,autoBuyAbilities=!1,nukeBossesAfterLevel=1e3,farmGoldOnBossesLevelDiff=200,useNukeOnBossAbovePercent=25,useMedicsAtPercent=40,useMedicsAtLanePercent=70,useMedicsAtLanePercentAliveReq=30,useNukeOnSpawnerAbovePercent=75,useMetalDetectorOnBossBelowPercent=30,useStealHealthAtPercent=15,useRainingGoldAbovePercent=50,useLikeNewAboveCooldown=1422e4,useResurrectToSaveCount=150,autoClickerFreq=1e3,autoRespawner,autoClicker,autoTargetSwapper,autoTargetSwapperElementUpdate,autoAbilityUser,autoUpgradeManager,elementUpdateRate=6e4,autoUseConsumables=!0,userElementMultipliers=[1,1,1,1],userMaxElementMultiiplier=1,swapReason,lastLootLevel=0,lastLootCache=[],upgradeManagerPrefilter;if(upgradeManagerPrefilter||$J.ajaxPrefilter(function(){void 0!==upgradeManagerPrefilter&&upgradeManagerPrefilter.apply(this,arguments)}),"undefined"!=typeof unsafeWindow){unsafeWindow.debug=debug,unsafeWindow.clicksPerSecond=clicksPerSecond,unsafeWindow.autoClickerVariance=autoClickerVariance,unsafeWindow.respawnCheckFreq=respawnCheckFreq,unsafeWindow.targetSwapperFreq=targetSwapperFreq,unsafeWindow.abilityUseCheckFreq=abilityUseCheckFreq,unsafeWindow.itemUseCheckFreq=itemUseCheckFreq,unsafeWindow.seekHealingPercent=seekHealingPercent,unsafeWindow.upgradeManagerFreq=upgradeManagerFreq,unsafeWindow.autoBuyAbilities=autoBuyAbilities,unsafeWindow.useMedicsAtPercent=useMedicsAtPercent,unsafeWindow.useMedicsAtLanePercent=useMedicsAtLanePercent,unsafeWindow.useMedicsAtLanePercentAliveReq=useMedicsAtLanePercentAliveReq,unsafeWindow.useNukeOnSpawnerAbovePercent=useNukeOnSpawnerAbovePercent,unsafeWindow.useMetalDetectorOnBossBelowPercent=useMetalDetectorOnBossBelowPercent,unsafeWindow.useStealHealthAtPercent=useStealHealthAtPercent,unsafeWindow.useRainingGoldAbovePercent=useRainingGoldAbovePercent,unsafeWindow.autoUseConsumables=autoUseConsumables,unsafeWindow.useResurrectToSaveCount=useResurrectToSaveCount,unsafeWindow.slaveWindowUICleanup=slaveWindowUICleanup,unsafeWindow.slaveWindowPeriodicRestart=slaveWindowPeriodicRestart,unsafeWindow.slaveWindowPeriodicRestartInterval=slaveWindowPeriodicRestartInterval,unsafeWindow.nukeBossesAfterLevel=nukeBossesAfterLevel,unsafeWindow.farmGoldOnBossesLevelDiff=farmGoldOnBossesLevelDiff,unsafeWindow.useNukeOnBossAbovePercent=useNukeOnBossAbovePercent,unsafeWindow.startAutoClicker=startAutoClicker,unsafeWindow.startAutoRespawner=startAutoRespawner,unsafeWindow.startAutoTargetSwapper=startAutoTargetSwapper,unsafeWindow.startAutoAbilityUser=startAutoAbilityUser,unsafeWindow.startAutoItemUser=startAutoItemUser,unsafeWindow.startAllAutos=startAllAutos,unsafeWindow.startAutoUpgradeManager=startAutoUpgradeManager,unsafeWindow.stopAutoClicker=stopAutoClicker,unsafeWindow.stopAutoRespawner=stopAutoRespawner,unsafeWindow.stopAutoTargetSwapper=stopAutoTargetSwapper,unsafeWindow.stopAutoAbilityUser=stopAutoAbilityUser,unsafeWindow.stopAutoItemUser=stopAutoItemUser,unsafeWindow.stopAutoUpgradeManager=stopAutoUpgradeManager,unsafeWindow.stopAllAutos=stopAllAutos,unsafeWindow.disableAutoNukes=disableAutoNukes,unsafeWindow.castAbility=castAbility,unsafeWindow.hasAbility=hasAbility,unsafeWindow.abilityIsUnlocked=abilityIsUnlocked,unsafeWindow.abilityCooldown=abilityCooldown,unsafeWindow.toggleAutoClicker=toggleAutoClicker,unsafeWindow.toggleAutoTargetSwapper=toggleAutoTargetSwapper,unsafeWindow.toggleAutoAbilityUser=toggleAutoAbilityUser,unsafeWindow.toggleAutoItemUser=toggleAutoItemUser,unsafeWindow.toggleAutoUpgradeManager=toggleAutoUpgradeManager,unsafeWindow.spamNoClick=spamNoClick,unsafeWindow.toggleSpammer=toggleSpammer,unsafeWindow.getTarget=getTarget,unsafeWindow.currentLaneHasAbility=currentLaneHasAbility,unsafeWindow.laneHasAbility=laneHasAbility,unsafeWindow.getMobTypePriority=getMobTypePriority;
var varSetter=setInterval(function(){debug&&console.log("updating options"),debug=unsafeWindow.debug,clicksPerSecond=unsafeWindow.clicksPerSecond,autoClickerVariance=unsafeWindow.autoClickerVariance,respawnCheckFreq=unsafeWindow.respawnCheckFreq,targetSwapperFreq=unsafeWindow.targetSwapperFreq,abilityUseCheckFreq=unsafeWindow.abilityUseCheckFreq,itemUseCheckFreq=unsafeWindow.itemUseCheckFreq,seekHealingPercent=unsafeWindow.seekHealingPercent,upgradeManagerFreq=unsafeWindow.upgradeManagerFreq,autoBuyAbilities=unsafeWindow.autoBuyAbilities,useMedicsAtPercent=unsafeWindow.useMedicsAtPercent,useMedicsAtLanePercent=unsafeWindow.useMedicsAtLanePercent,useMedicsAtLanePercentAliveReq=unsafeWindow.useMedicsAtLanePercentAliveReq,useNukeOnSpawnerAbovePercent=unsafeWindow.useNukeOnSpawnerAbovePercent,useMetalDetectorOnBossBelowPercent=unsafeWindow.useMetalDetectorOnBossBelowPercent,useStealHealthAtPercent=unsafeWindow.useStealHealthAtPercent,useRainingGoldAbovePercent=unsafeWindow.useRainingGoldAbovePercent,useResurrectToSaveCount=unsafeWindow.useResurrectToSaveCount,nukeBossesAfterLevel=unsafeWindow.nukeBossesAfterLevel,farmGoldOnBossesLevelDiff=unsafeWindow.farmGoldOnBossesLevelDiff,useNukeOnBossAbovePercent=unsafeWindow.useNukeOnBossAbovePercent},5e3);unsafeWindow.getDebug=function(){return debug},unsafeWindow.setDebug=function(e){debug=e}}var startAll=setInterval(function(){gameRunning()&&(clearInterval(startAll),startAllAutos(),addPointer(),addExtraUI(),updatePlayersInLane(),updatePlayersInRoom(),setInterval(function(){updatePlayersInLane(),updatePlayersInRoom()},1e4),$J(".leave_game_btn").mouseover(function(){$J(".leave_game_helper").show()}).mouseout(function(){$J(".leave_game_helper").hide()}),$J(".leave_game_helper").hide(),"function"==typeof runMaster&&(location.search.match(/slave/)?runSlave():runMaster()),CSceneGame.prototype.ClearNewPlayer=function(){if(this.m_spriteFinger){{WebStorage.SetLocal("mg_how2click",1)}$J("#newplayer").hide()}},CUI.prototype.UpdateLootNotification=function(){if(this.m_Game.m_rgPlayerData.loot&&0!==this.m_Game.m_rgPlayerData.loot.length&&this.m_Game.m_rgGameData.level>=lastLootLevel+10&&(0===lastLootCache.length||lastLootCache.toString()!==this.m_Game.m_rgPlayerData.loot.toString())){$J("#loot_notification").show();for(var e=this.m_Game.m_rgTuningData.abilities,t="",a=0;a<this.m_Game.m_rgPlayerData.loot.length;++a){var n=this.m_Game.m_rgPlayerData.loot[a];0!==a&&(t+=", "),t+=e[n.ability].name}$J("#loot_name").text(t),setTimeout(function(){$J("#loot_notification").fadeOut(1e3)},5e3),lastLootLevel=this.m_Game.m_rgGameData.level,lastLootCache=this.m_Game.m_rgPlayerData.loot,this.m_Game.m_rgPlayerData.loot=[]}})},1e3),endDate=initEndDate(),spammer;