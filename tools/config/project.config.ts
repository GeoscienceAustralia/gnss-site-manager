import {join} from 'path';

import {SeedConfig} from './seed.config';
import {ExtendPackages} from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

    PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

    FONTS_DEST = `${this.APP_DEST}/fonts`;
    FONTS_SRC = [
        'node_modules/bootstrap/dist/fonts/*'
    ];

    constructor() {
        super();

        this.APP_TITLE = 'GNSS Site Manager';

        /* Enable typeless compiler runs (faster) between typed compiler runs. */
        // this.TYPED_COMPILE_INTERVAL = 5;

        // Add `NPM` third-party libraries to be injected/bundled.
        this.NPM_DEPENDENCIES = [
            ...this.NPM_DEPENDENCIES,
            {src: 'systemjs/dist/system.src.js', inject: 'shims'},
            {src: 'bootstrap/dist/css/bootstrap.min.css', inject: true}, // inject into css section
            {src: 'jsonix/jsonix.js', inject: 'libs'},
            {src: 'w3c-schemas/lib/XLink_1_0.js', inject: 'libs'},
            {src: 'ogc-schemas/lib/GML_3_2_1.js', inject: 'libs'},
            {src: 'ogc-schemas/lib/ISO19139_GMD_20070417.js', inject: 'libs'},
            {src: 'ogc-schemas/lib/ISO19139_GCO_20070417.js', inject: 'libs'},
            {src: 'ogc-schemas/lib/ISO19139_GSR_20070417.js', inject: 'libs'},
            {src: 'ogc-schemas/lib/ISO19139_GTS_20070417.js', inject: 'libs'},
            {src: 'ogc-schemas/lib/ISO19139_GSS_20070417.js', inject: 'libs'},
            {src: 'ogc-schemas/lib/OM_2_0.js', inject: 'libs'},
            {src: 'ogc-schemas/lib/GEODESYML_0_3.js', inject: 'libs'},
            {src: 'ogc-schemas/lib/Filter_2_0.js', inject: 'libs'},
            {src: 'ogc-schemas/lib/OWS_1_1_0.js', inject: 'libs'},
            {src: 'ogc-schemas/lib/WFS_2_0.js', inject: 'libs'},
        ];

        // Add `local` third-party libraries to be injected/bundled.
        this.APP_ASSETS = [
            ...this.APP_ASSETS,
            // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
            // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
        ];

        // Add packages (e.g. ng2-translate)
        let additionalPackages: ExtendPackages[] = [
            {
                name: 'ng2-bootstrap',
                path: 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js'
            },
            {
                name: 'ng2-bootstrap/*',
                path: 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js'
            },
            {
                name: 'lodash',
                path: 'node_modules/lodash/lodash.js'
            },
            {
                name: 'alertify.js',
                path: 'node_modules/alertify.js/dist/js/alertify.js'
            },
            {
                name: 'json-pointer',
                path: 'node_modules/json-pointer/index.js'
            },
            {
                name: 'deep-diff',
                path: 'node_modules/deep-diff/index.js'
            },
            {
                name: 'scroll-into-view',
                path: 'node_modules/scroll-into-view/scrollIntoView.js'
            },
            {
                name: 'foreach',
                path: 'node_modules/foreach/index.js'
            },
            {
                name: 'raf',
                path: 'node_modules/raf/index.js'
            },
            {
                name: 'performance-now',
                path: 'node_modules/performance-now/lib/performance-now.js'
            },
            {
                name: 'traceur',
                path: 'node_modules/traceur/bin/traceur.js'
            },
            {
                name: 'moment',
                path: 'node_modules/moment/moment.js'
            },
            {
                name: 'oidc-client',
                path: 'node_modules/oidc-client/lib/oidc-client.min.js'
            }
        ];

        this.addPackagesBundles(additionalPackages);

        /* Add to or override NPM module configurations: */
        // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
    }

}
