[{"bookPath":"","title":"Compiled Output","titleId":"ref-backends","hasOtp":true,"hasPageHeader":true},"<p>\n  <i id=\"p_0\" class=\"pid\"></i>This section describes the compilation output of Reach version 0.1.7,\n  which are participant backends.<a href=\"#p_0\" class=\"pid\">0</a>\n</p>\n<p><i id=\"p_1\" class=\"pid\"></i>They are accessed via <a href=\"/cout/#ref-backends-js\">JavaScript</a> or via <a href=\"/rpc/#ref-backends-rpc\">the RPC server</a>.<a href=\"#p_1\" class=\"pid\">1</a></p>\n<h2 id=\"ref-backends-js\" class=\"refHeader\">JavaScript<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#ref-backends-js\"><span class=\"icon icon-link\"></span></a></h2>\n<p>\n  <i id=\"p_2\" class=\"pid\"></i>The Reach JavaScript backend produces a compilation output named <code>input.APP.mjs</code>.\n  This will normally be imported by writing:<a href=\"#p_2\" class=\"pid\">2</a>\n</p>\n<p><span class=\"ref\" id=\"js_backend\" data-scope=\"js\" data-symbol=\"backend\"></span></p>\n<pre class=\"snippet unnumbered\"><div class=\"codeHeader\">&nbsp;<a class=\"far fa-copy copyBtn\" data-clipboard-text=\"import * as backend from './build/index.main.mjs';\" href=\"#\"></a></div><ol class=\"snippet\"><li value=\"1\"><span style=\"color: #D73A49\">import</span><span style=\"color: #24292E\"> </span><span style=\"color: #005CC5\">*</span><span style=\"color: #24292E\"> </span><span style=\"color: #D73A49\">as</span><span style=\"color: #24292E\"> backend </span><span style=\"color: #D73A49\">from</span><span style=\"color: #24292E\"> </span><span style=\"color: #032F62\">'./build/index.main.mjs'</span><span style=\"color: #24292E\">;</span></li></ol></pre>\n<p>\n  <i id=\"p_3\" class=\"pid\"></i>This module exports an asynchronous function for each participant.\n  For example, if a Reach program contains a participant named <span class=\"snip\"><span style=\"color: #032F62\">'A'</span></span> in the <span class=\"snip\"><span style=\"color: #24292E\">Reach.App</span></span>, then the JavaScript backend will include a function named <span class=\"snip\"><span style=\"color: #005CC5\">A</span></span> (i.e. <span class=\"snip\"><span style=\"color: #24292E\">backend.</span><span style=\"color: #005CC5\">A</span></span>).\n  The <span class=\"snip\"><span style=\"color: #005CC5\">Promise</span></span> returned by these functions is resolved when the Reach program terminates (i.e. reaches <span class=\"snip\"><span style=\"color: #6F42C1\">exit</span><span style=\"color: #24292E\">();</span></span>).<a href=\"#p_3\" class=\"pid\">3</a>\n</p>\n<p><i id=\"p_4\" class=\"pid\"></i>Each function accepts two arguments: <span class=\"snip\"><span style=\"color: #24292E\">ctc</span></span> and <span class=\"snip\"><span style=\"color: #24292E\">interact</span></span>. These functions should be called by the frontend.<a href=\"#p_4\" class=\"pid\">4</a></p>\n<p><i id=\"p_5\" class=\"pid\"></i>The <span class=\"snip\"><span style=\"color: #24292E\">ctc</span></span> argument is the result of a call to the functions <span class=\"snip\"><span style=\"color: #24292E\">acc.deploy</span></span> or <span class=\"snip\"><span style=\"color: #24292E\">acc.attach</span></span> provided by the <a href=\"/frontend/#ref-frontends-js\">JavaScript frontend support library</a>.<a href=\"#p_5\" class=\"pid\">5</a></p>\n<p>\n  <i id=\"p_6\" class=\"pid\"></i>The <span class=\"snip\"><span style=\"color: #24292E\">interact</span></span> argument is an object matching the participant interact interface for the corresponding participant.\n  The types of values this object contains must match those specified\n  <a href=\"/frontend/#ref-frontends-js-types\">on this list</a>.\n  Each function may return a <span class=\"snip\"><span style=\"color: #005CC5\">Promise</span></span>, which the backend will <span class=\"snip\"><span style=\"color: #D73A49\">await</span></span>, if it needs to perform an asynchronous action.<a href=\"#p_6\" class=\"pid\">6</a>\n</p>\n<p>\n  <i id=\"p_7\" class=\"pid\"></i>The backend provides a value, <span class=\"snip\"><span style=\"color: #24292E\">_version</span></span>, which is a string representation of the Reach version used to compile the program.\n  For example, the version of Reach used to produce this documentation would contain the string <span class=\"snip\"><span style=\"color: #032F62\">'reach-vers'</span></span>.<a href=\"#p_7\" class=\"pid\">7</a>\n</p>\n<p>\n  <i id=\"p_8\" class=\"pid\"></i>The backend provides a function, <span class=\"ref\" id=\"js_getExports\" data-scope=\"js\" data-symbol=\"getExports\"></span><span class=\"snip\"><span style=\"color: #24292E\">getExports</span></span>, which exposes the exports of a Reach program.\n  This function receives the standard library as an argument and returns an object with all the exports present in the module being compiled.<a href=\"#p_8\" class=\"pid\">8</a>\n</p>\n<div class=\"note\">\n  <p><i id=\"p_9\" class=\"pid\"></i>It's possible to expose bindings from other modules to <span class=\"snip\"><span style=\"color: #24292E\">getExports</span></span> by re-exporting them in your \"top-level\" module.<a href=\"#p_9\" class=\"pid\">9</a></p>\n</div>\n<p>\n  <i id=\"p_10\" class=\"pid\"></i>For example, if a Reach program\n  exported a variable <code>x</code>, i.e. <span class=\"snip\"><span style=\"color: #D73A49\">export</span><span style=\"color: #24292E\"> </span><span style=\"color: #D73A49\">const</span><span style=\"color: #24292E\"> </span><span style=\"color: #005CC5\">x</span><span style=\"color: #24292E\"> </span><span style=\"color: #D73A49\">=</span><span style=\"color: #24292E\"> </span><span style=\"color: #005CC5\">5</span></span>, the frontend could access the value in the following manner:<a href=\"#p_10\" class=\"pid\">10</a>\n</p>\n<pre class=\"snippet numbered\"><div class=\"codeHeader\">&nbsp;<a class=\"far fa-copy copyBtn\" data-clipboard-text=\"const stdlib = await loadStdlib();\nbackend.getExports(stdlib).x; // 5\" href=\"#\"></a></div><ol class=\"snippet\"><li value=\"1\"><span style=\"color: #D73A49\">const</span><span style=\"color: #24292E\"> </span><span style=\"color: #005CC5\">stdlib</span><span style=\"color: #24292E\"> </span><span style=\"color: #D73A49\">=</span><span style=\"color: #24292E\"> </span><span style=\"color: #D73A49\">await</span><span style=\"color: #24292E\"> </span><span style=\"color: #6F42C1\">loadStdlib</span><span style=\"color: #24292E\">();</span></li><li value=\"2\"><span style=\"color: #24292E\">backend.</span><span style=\"color: #6F42C1\">getExports</span><span style=\"color: #24292E\">(stdlib).x; </span><span style=\"color: #6A737D\">// 5</span></li></ol></pre>\n<p><i id=\"p_11\" class=\"pid\"></i>Finally, the backend provides a value, <span class=\"snip\"><span style=\"color: #24292E\">_Connectors</span></span>, which is an opaque object representing the connectors the app was compiled for.<a href=\"#p_11\" class=\"pid\">11</a></p>\n<h3 id=\"ref-backends-js-guarantees\" class=\"refHeader\">Guarantees<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#ref-backends-js-guarantees\"><span class=\"icon icon-link\"></span></a></h3>\n<p>\n  <i id=\"p_12\" class=\"pid\"></i>This backend does not guarantee that values in a positive position in a participant interact interface, that are later passed to a negative position in a participant interact interface, will be identical, in the sense of JavaScript's <span class=\"snip\"><span style=\"color: #D73A49\">===</span></span> operator, to the original value.\n  In other words, this backend does not ensure that Reach programs are parametric over JavaScript values that they interact with.<a href=\"#p_12\" class=\"pid\">12</a>\n</p>\n<p>\n  <i id=\"p_13\" class=\"pid\"></i>Positive and negative are best understood by example with a function type: a positive position is supplied by the function, such as the result; while a negative position is supplied by the caller, such as the arguments.\n  These notions generalize, however, to higher (and lower) order contexts.\n  In the case of Reach, this means that non-function values in a participant interact interface are positive.<a href=\"#p_13\" class=\"pid\">13</a>\n</p>\n<p><i id=\"p_14\" class=\"pid\"></i>For example, if the Reach program,<a href=\"#p_14\" class=\"pid\">14</a></p>\n<pre class=\"snippet numbered\"><div class=\"codeHeader\">&nbsp;<a class=\"far fa-copy copyBtn\" data-clipboard-text=\"Reach.App( {},\n [ Participant(&quot;A&quot;, {\n     get: Bytes(32),\n     give: Fun([Bytes(32)], Bool) } ) ],\n (A) => {\n  A.only(() => {\n   const x = interact.give(interact.get); });\n  A.publish(x);\n  commit(); });\" href=\"#\"></a></div><ol class=\"snippet\"><li value=\"1\"><span style=\"color: #24292E\">Reach.</span><span style=\"color: #6F42C1\">App</span><span style=\"color: #24292E\">( {},</span></li><li value=\"2\"><span style=\"color: #24292E\"> [ </span><span style=\"color: #6F42C1\">Participant</span><span style=\"color: #24292E\">(</span><span style=\"color: #032F62\">\"A\"</span><span style=\"color: #24292E\">, {</span></li><li value=\"3\"><span style=\"color: #24292E\">     get: </span><span style=\"color: #6F42C1\">Bytes</span><span style=\"color: #24292E\">(</span><span style=\"color: #005CC5\">32</span><span style=\"color: #24292E\">),</span></li><li value=\"4\"><span style=\"color: #24292E\">     give: </span><span style=\"color: #6F42C1\">Fun</span><span style=\"color: #24292E\">([</span><span style=\"color: #6F42C1\">Bytes</span><span style=\"color: #24292E\">(</span><span style=\"color: #005CC5\">32</span><span style=\"color: #24292E\">)], Bool) } ) ],</span></li><li value=\"5\"><span style=\"color: #24292E\"> (</span><span style=\"color: #E36209\">A</span><span style=\"color: #24292E\">) </span><span style=\"color: #D73A49\">=&gt;</span><span style=\"color: #24292E\"> {</span></li><li value=\"6\"><span style=\"color: #24292E\">  </span><span style=\"color: #005CC5\">A</span><span style=\"color: #24292E\">.</span><span style=\"color: #6F42C1\">only</span><span style=\"color: #24292E\">(() </span><span style=\"color: #D73A49\">=&gt;</span><span style=\"color: #24292E\"> {</span></li><li value=\"7\"><span style=\"color: #24292E\">   </span><span style=\"color: #D73A49\">const</span><span style=\"color: #24292E\"> </span><span style=\"color: #005CC5\">x</span><span style=\"color: #24292E\"> </span><span style=\"color: #D73A49\">=</span><span style=\"color: #24292E\"> interact.</span><span style=\"color: #6F42C1\">give</span><span style=\"color: #24292E\">(interact.get); });</span></li><li value=\"8\"><span style=\"color: #24292E\">  </span><span style=\"color: #005CC5\">A</span><span style=\"color: #24292E\">.</span><span style=\"color: #6F42C1\">publish</span><span style=\"color: #24292E\">(x);</span></li><li value=\"9\"><span style=\"color: #24292E\">  </span><span style=\"color: #6F42C1\">commit</span><span style=\"color: #24292E\">(); });</span></li></ol></pre>\n<p><i id=\"p_15\" class=\"pid\"></i>is given the <span class=\"snip\"><span style=\"color: #24292E\">interact</span></span> object,<a href=\"#p_15\" class=\"pid\">15</a></p>\n<pre class=\"snippet numbered\"><div class=\"codeHeader\">&nbsp;<a class=\"far fa-copy copyBtn\" data-clipboard-text=\"const x = &quot;A string&quot;;\n{ get: x,\n  give: (str) => x === str }\" href=\"#\"></a></div><ol class=\"snippet\"><li value=\"1\"><span style=\"color: #D73A49\">const</span><span style=\"color: #24292E\"> </span><span style=\"color: #005CC5\">x</span><span style=\"color: #24292E\"> </span><span style=\"color: #D73A49\">=</span><span style=\"color: #24292E\"> </span><span style=\"color: #032F62\">\"A string\"</span><span style=\"color: #24292E\">;</span></li><li value=\"2\"><span style=\"color: #24292E\">{ </span><span style=\"color: #E36209\">get</span><span style=\"color: #24292E\">: x,</span></li><li value=\"3\"><span style=\"color: #24292E\">  </span><span style=\"color: #E36209\">give</span><span style=\"color: #24292E\">: (</span><span style=\"color: #E36209\">str</span><span style=\"color: #24292E\">) </span><span style=\"color: #D73A49\">=&gt;</span><span style=\"color: #24292E\"> x </span><span style=\"color: #D73A49\">===</span><span style=\"color: #24292E\"> str }</span></li></ol></pre>\n<p>\n  <i id=\"p_16\" class=\"pid\"></i>then it is not guaranteed that <span class=\"snip\"><span style=\"color: #005CC5\">A</span></span> will publish <span class=\"snip\"><span style=\"color: #005CC5\">true</span></span>, because the <span class=\"snip\"><span style=\"color: #24292E\">str</span></span> given to <span class=\"snip\"><span style=\"color: #24292E\">give</span></span> may not be identical to <span class=\"snip\"><span style=\"color: #24292E\">x</span></span>.\n  (However, they are <span class=\"snip\"><span style=\"color: #24292E\">bytesEq</span></span>.)<a href=\"#p_16\" class=\"pid\">16</a>\n</p>","<ul><li class=\"dynamic\">\n    <a href=\"#ref-backends\">Compiled Output</a>\n    <ul class=\"dynamic\">\n      <li class=\"dynamic\">\n        <a href=\"#ref-backends-js\">JavaScript</a>\n        <ul class=\"dynamic\">\n          <li class=\"dynamic\"><a href=\"#ref-backends-js-guarantees\">Guarantees</a></li>\n        </ul>\n      </li>\n    </ul>\n  </li></ul>"]