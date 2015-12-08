/**
 ******************************************************************************
 * @file    js/app.js
 * @author  David Middlecamp (david@particle.io)
 * @company Particle ( https://www.particle.io/ )
 * @source https://github.com/spark/particle-cli
 * @version V1.0.0
 * @date    27-December-2013
 * @brief   Main program body.
 ******************************************************************************
	Copyright (c) 2016 Particle Industries, Inc.  All rights reserved.

	This program is free software; you can redistribute it and/or
	modify it under the terms of the GNU Lesser General Public
	License as published by the Free Software Foundation, either
	version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public
	License along with this program; if not, see <http://www.gnu.org/licenses/>.
	******************************************************************************
 */
'use strict';

var updateCheck = require('./lib/update-check');

var _ = require('lodash');

var cli = require('./nested-yargs');
var app = cli.createApp({
	options: {
		v: {
			alias: 'verbose',
			count: true,
			description: 'How much to display'
		}
	},
	version: require('./package').version
});
require('./cmd')(app, cli);

function addGlobalSetup(cat) {
	cat.options.setup = addGlobalOptions;
	_.each(cat.commands, addGlobalSetup);
}

function addGlobalOptions(yargs) {
	_.each(app.options.options, function addGlobalOption(opt, name) {
		yargs.option(name, opt);
	});
}

addGlobalSetup(app);
updateCheck(function updateCheckFinished() {
	// var Interpreter = require('./lib/interpreter.js');
	// var cli = new Interpreter();
	// cli.supressWarmupMessages = true;
	// cli.startup();
	// cli.handle(process.argv, true);
	cli.run(app);
});
