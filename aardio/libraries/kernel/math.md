# math库

 数学函数库
<table>
    <tr>
      <th>&#x51FD;&#x6570;&#x5B9A;&#x4E49;</th>
      <th>&#x8BF4;&#x660E;</th>
      <th>&#x793A;&#x4F8B;</th>
    </tr>
	<tr>
      <td>math.size64(
        &#xA0;&#xA0;&#xA0;&#xA0;&#x6570;&#x503C;&#x4F4E;&#x4F4D;,&#x6570;&#x503C;&#x9AD8;&#x4F4D; 
        &#xA0;&#xA0;&#xA0;&#xA0;)</td>
      <td>&#x521B;&#x5EFA;64&#x4F4D;&#x65E0;&#x7B26;&#x53F7;&#x957F;&#x6574;&#x6570;(&#x65E0;&#x7B26;&#x53F7;&#x6307;&#x6CA1;&#x6709;&#x8D1F;&#x6570;&#xFF0C;&#x5373;&#x6CA1;&#x6709;&#x7B26;&#x53F7;&#x4F4D;)&#xFF0C;&#x6784;&#x9020;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x6216;&#x4E24;&#x4E2A;&#x6570;&#x503C;&#x6216;&#x5B57;&#x7B26;&#x4E32;&#x6307;&#x5B9A;&#x7684;&#x6570;&#x503C;,&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x590D;&#x5236;&#x5176;&#x4ED6;math.size64&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;()&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x53EF;&#x517C;&#x5BB9;API&#x7C7B;&#x578B;&#x4E2D;&#x7684;LONG&#x7C7B;&#x578B;(&#x65E0;&#x7B26;&#x53F7;&#x957F;&#x6574;&#x6570;)  &#x6CE8;&#x610F;aardio&#x666E;&#x901A;&#x6570;&#x503C;&#x8868;&#x793A;&#x7684;&#x6709;&#x6548;&#x6574;&#x6570;&#x8303;&#x56F4;&#x5728;&#x6B63;&#x8D1F; (2**<sup>53</sup> - 1) &#x4E4B;&#x95F4;&#xFF0C;&#x800C;math.size64&#x53EF;&#x4EE5;&#x4F7F;&#x7528;64&#x4E2A;&#x4E8C;&#x8FDB;&#x5236;&#x4F4D;&#x8868;&#x793A;&#x66F4;&#x5927;&#x7684;&#x6B63;&#x6574;&#x6570;. </td>
      <td>var size = math.size64(1,2);size.add(2);var size2 = size + 3;io.open();io.print( size2.format(),size2 )</td>
    </tr>
    <tr>
      <td>math.randomize(
        &#xA0;&#xA0;&#xA0;&#xA0;seed=time.tick() 
        &#xA0;&#xA0;&#xA0;&#xA0;)</td>
      <td><span>&#x8BBE;&#x7F6E;</span>&#x968F;&#x673A;&#x6570;&#x79CD;&#x5B50;&#xFF0C;
        &#x5728;&#x4F7F;&#x7528;math.random&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x968F;&#x673A;&#x6570;&#x4EE5;&#x524D;&#xFF0C;
        &#x5FC5;&#x987B;&#x8C03;&#x7528;&#x5E76;&#x4E14;&#x4EC5;&#x8C03;&#x7528;math.randomize()&#x4E00;&#x6B21;&#x3002;
        
      &#x53C2;&#x8003;&#xFF1A;<a>&#x968F;&#x673A;&#x6570;</a> </td>
      <td>math.randomize()</td>
    </tr>
    <tr>
      <td>math.random(min,max)</td>
      <td>&#x83B7;&#x53D6;&#x968F;&#x673A;&#x6570;
        &#x53C2;&#x8003;&#xFF1A;<a>&#x968F;&#x673A;&#x6570;</a></td>
      <td>math.random(5,   99) //&#x8FD4;&#x56DE;[5,99]&#x4E4B;&#x95F4;&#x7684;&#x968F;&#x673A;&#x6570;
        math.random() &#x8FD4;&#x56DE;(0,1)&#x4E4B;&#x95F4;&#x7684;&#x5C0F;&#x6570;</td>
    </tr>

    <tr>
      <td>math.pi</td>
      <td>&#x5706;&#x5468;&#x7387;&#x5E38;&#x91CF;</td>
      <td>3.14159265358979323846</td>
    </tr>
    <tr>
      <td>math.abs(x)</td>
      <td>&#x53D6;&#x7EDD;&#x5BF9;&#x503C; |x| = math.abs(x)</td>
      <td>math.abs(-20)</td>
    </tr>

    <tr>
      <td>math.ceil(x)</td>
      <td>&#x4E0A;&#x53D6;&#x6574;&#x4E3A;&#x6700;&#x63A5;&#x8FD1;&#x7684;&#x6574;&#x6570;
        
        <font>math.ceil(x) == &#x2308;x&#x2309;</font></td>
      <td>math.ceil(4.5)</td>
    </tr>
    <tr>
      <td>math.floor(x)</td>
      <td><p>&#x4E0B;&#x53D6;&#x6574;&#x4E3A;&#x6700;&#x63A5;&#x8FD1;&#x7684;&#x6574;&#x6570;
        <font>math.floor(x) == &#x230A;x&#x230B;</font></p></td>
      <td>math.floor(4.5)</td>
    </tr>
    <tr>
      <td>math.round(x)</td>
      <td>&#x56DB;&#x820D;&#x4E94;&#x5165;&#x53D6;&#x6574;</td>
      <td>math.round(4.6) //&#x7ED3;&#x679C;&#x4E3A;5
        math.round(4.2) //&#x7ED3;&#x679C;&#x4E3A;4
        
       	  math.round = function(n){
&#xA0;&#xA0;&#xA0;&#xA0;return math.floor(n+0.5)
}</td>
    </tr>
    <tr>
      <td> <p>&#x6570;</p>
        <p>&#x5B66;</p>
        <p>&#x77E5;</p>
        <p>&#x8BC6;</p>
        <p>&#x56DE;</p>
        <p>&#x987E;</p></td>
      <td>&#x5BF9;&#x4E8E;&#x6240;&#x6709;&#x5B9E;&#x6570;x:
        <pre><font> x-1 &lt; &#x230A;x&#x230B;  &lt;= x &lt;= &#x2308;x&#x2309; &lt; x+1  </font></pre>
        
        &#x5BF9;&#x4E8E;&#x6240;&#x6709;&#x6574;&#x6570;x:
        <pre><font>&#x230A;x/2&#x230B;  + &#x2308;x/2&#x2309; == n</font>
a % b == a - <font>&#x230A;a/n&#x230B; n</font></pre></td>
      </tr>
      <tr>
      <td>math.sqrt(x)</td>
      <td>&#x5F00;&#x5E73;&#x65B9;&#x51FD;&#x6570;</td>
      <td>math.sqrt(25)</td>
    </tr>
    <tr>
      <td>math.log<sub>10</sub>(x)</td>
      <td>&#x8BA1;&#x7B97;&#x4EE5;10&#x4E3A;&#x57FA;&#x6570;&#x7684;&#x5BF9;&#x6570;</td>
      <td>math.log<sub>10</sub>(200)</td>
    </tr>
    <tr>
      <td>math.log(x)</td>
      <td>&#x8BA1;&#x7B97;&#x4E00;&#x4E2A;&#x6570;&#x5B57;x&#x7684;&#x81EA;&#x7136;&#x5BF9;&#x6570;(&#x4EE5;e&#x4E3A;&#x5E95;)</td>
      <td>math.log(2.5)</td>
    </tr>

     <tr>
       <td> <p>&#x6570;</p>
        <p>&#x5B66;</p>
        <p>&#x77E5;</p>
        <p>&#x8BC6;</p>
        <p>&#x56DE;</p>
        <p>&#x987E;</p></td>
       <td><p>&#x5728;&#x5F0F;&#x5B50; 10<sup>2</sup> = 100 &#x4E2D; 
         &#x5176;&#x4E2D;10&#x4E3A;&#x5E95;&#x6570;,2&#x4E3A;&#x6307;&#x6570;,100&#x4E3A;&#x5E42;&#x6570;
         100&#x662F;10&#x7684;2&#x6B21;&#x5E42;&#xFF0C;
         2&#x662F;100&#x7684;&#x5BF9;&#x6570;(&#x4EE5;10&#x4E3A;&#x5E95;&#x6570;)
         &#x3002;
         
         1&#x3001;&#x7531;&#x5E95;&#x6570;10,&#x6307;&#x6570;2&#x5F97;&#x5230;&#x5E42;&#x6570;100&#x7684;&#x8FD0;&#x7B97;&#x79F0;&#x4E3A;&#x4E58;&#x65B9;&#x8FD0;&#x7B97;&#xFF1A;
       </p>
         <pre>10<sup>**</sup>2 == 100</pre>
         <p></p>
         <p>2&#x3001;&#x7531;&#x5E42;&#x6570;100,&#x6307;&#x6570;2&#x5F97;&#x5230;&#x5E95;&#x6570;10&#x7684;&#x8FD0;&#x7B97;&#x79F0;&#x4E3A;&#x5F00;&#x65B9;&#x8FD0;&#x7B97;&#xFF1A;
         </p>
         <pre>100**(1/2) == 10</pre>
         
&#x5F00;2&#x6B21;&#x65B9;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7528;&#x51FD;&#x6570;&#xFF1A;math.sqrt(100) == 10
<p></p>
<p>3&#x3001;&#x7531;&#x5E95;&#x6570;10,&#x5E42;&#x6570;100&#x5F97;&#x5230;&#x6307;&#x6570;2&#x7684;&#x8FD0;&#x7B97;&#x662F;&#x5BF9;&#x6570;&#x8FD0;&#x7B97;&#xFF1A;
</p>
<pre> math.log10(100)  == 2</pre>
<p>
  &#x5728;&#x4E0A;&#x9762;&#x7684;&#x5BF9;&#x6570;&#x8FD0;&#x7B97;&#x91CC;&#xFF0C;10&#x4E3A;&#x5E95;&#x6570;&#x3001;100&#x4E3A;&#x771F;&#x6570;&#xFF0C;2&#x4E3A;&#x5BF9;&#x6570;&#x3002;
  2&#x662F;100&#x7684;&#x5BF9;&#x6570;(&#x4EE5;10&#x4E3A;&#x5E95;&#x6570;)&#x3002;&#x8BB0;&#x4E3A;&#xFF1A;log<sub>10</sub>100 = 2</p>
<p>&#x4EE5;e&#x4E3A;&#x5E95;&#x7684;&#x5BF9;&#x8C61;&#x79F0;&#x4E3A;&#x81EA;&#x7136;&#x5BF9;&#x6570;&#x3002;100&#x7684;&#x81EA;&#x7136;&#x5BF9;&#x6570;&#x8BB0;&#x4E3A;&#xFF1A;log<sub>e</sub>100  </p></td>
     </tr>
     <tr>
      <td>&#xA0;</td>
      <td><p>e=1+1/1!+1/2!+1/3!+&#x2026;&#xFFFD;&#xFFFD;=2.71828 &#x8BA1;&#x4E3A;&#xFF1A;            <img>
        </p><p>&#x201C;!&#x201D;&#x8868;&#x793A;&#x9636;&#x4E58;&#x7B26;&#x53F7;&#xFF0E;&#x901A;&#x5E38;&#x8DDF;&#x5728;&#x4E00;&#x4E2A;&#x81EA;&#x7136;&#x6570;&#x7684;&#x540E;&#x9762;&#x3002;&#x5982;&#xFF1A;
          3!&#xFF1D;3&#xD7;2&#xD7;1 
          5!&#xFF1D;5&#xD7;4&#xD7;3&#xD7;2&#xD7;1
</p><p>&#xA0;</p></td>
      </tr>
   <tr>
      <td>math.exp(x)</td>
      <td>&#x8BA1;&#x7B97;&#x4EE5;e&#x4E3A;&#x5E95;x&#x6B21;&#x65B9;&#x503C;</td>
      <td>math.exp(2)</td>
    </tr>
     <tr>
      <td>math.ldexp(m,n)</td>
      <td>&#x5DF2;&#x77E5;&#x5C3E;&#x6570;m &#x548C;&#x6307;&#x6570;n &#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x5B57;x
        (&#x65B9;&#x7A0B;&#x5F0F;&#xFF1A;x = m * 2^n)&#x3002;</td>
      <td>math.ldexp(5, 3)</td>
    </tr>
    <tr>
      <td>math.frexp(x)</td>
      <td> &#x8FD4;&#x56DE;&#x6570;&#x5B57;x &#x7684;&#x5C3E;&#x6570;m &#x548C;&#x6307;&#x6570;n
(&#x65B9;&#x7A0B;&#x5F0F;&#xFF1A;x = m * 2^n) </td>
      <td>math.frexp(10)</td>
    </tr>
    <tr>
      <td> <p>&#x6570;</p>
        <p>&#x5B66;</p>
        <p>&#x77E5;</p>
        <p>&#x8BC6;</p>
        <p>&#x56DE;</p>
        <p>&#x987E;</p></td>
      <td><p>&#x5728;aardio&#x4E2D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x79D1;&#x5B66;&#x8BA1;&#x6570;&#x6CD5;&#x8868;&#x793A;&#x6570;&#x503C;&#x3002;
        
        &#x79D1;&#x5B66;&#x8BA1;&#x6570;&#x6CD5;&#x5C06;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#x8868;&#x793A;&#x6210; ( a * 10&#x7684;n&#x6B21;&#x5E42;&#x7684;&#x5F62;&#x5F0F; ) &#xFF0C;&#x8BB0;&#x4E3A;&#xFF1A;aEn &#x5176;&#x4E2D;a&#x4E3A;&#x5C3E;&#x6570;&#xFF0C;&#x800C;n&#x4E3A;&#x6307;&#x6570;&#x3002;
        &#x5C3E;&#x6570;&#x7684;&#x8303;&#x56F4;&#x901A;&#x5E38;&#x662F; 1.0 &lt;= |x| &lt; 10.0        
        
      &#x4F8B;&#x5982;&#xFF1A;
      1E+09 &#x8868;&#x793A;1*10&#x7684;9&#x6B21;&#x65B9;
1E-02 &#x8868;&#x793A;1*10&#x7684;&#x8D1F;2&#x6B21;&#x65B9;&#xFF0C;&#x5373;1*10&#x7684;2&#x6B21;&#x5E42;&#x5206;&#x4E4B;&#x4E00;&#xFF0C;&#x5373;0.01</p>
        <p>
        </p></td>
      </tr>
    <tr>
      <td>math.max(n,n2,...)</td>
      <td>&#x53D6;&#x5F97;&#x6570;&#x4E2D;&#x6700;&#x5927;&#x503C;</td>
      <td>math.max(2,3,4,5)</td>
    </tr>
    <tr>
      <td>math.min(n,n2,...)</td>
      <td>&#x53D6;&#x5F97;&#x53C2;&#x6570;&#x4E2D;&#x6700;&#x5C0F;&#x503C;</td>
      <td>math.min(2,3,4,5)</td>
    </tr>
    <tr>
      <td>math.modf(x)</td>
      <td>&#x628A;&#x6570;&#x5206;&#x4E3A;&#x6574;&#x6570;&#x548C;&#x5C0F;&#x6570;</td>
      <td>math.modf(23.45)</td>
    </tr>

    <tr>
      <td>math.rad(x)</td>
      <td>&#x89D2;&#x5EA6;&#x8F6C;&#x5F27;&#x5EA6;</td>
      <td>math.rad(180)</td>
    </tr>
    <tr>
      <td>math.deg(x)</td>
      <td>&#x5F27;&#x5EA6;&#x8F6C;&#x89D2;&#x5EA6;</td>
      <td>math.deg(math.pi)</td>
    </tr>
    <tr>
      <td> <p>&#x6570;</p>
        <p>&#x5B66;</p>
        <p>&#x77E5;</p>
        <p>&#x8BC6;</p>
        <p>&#x56DE;</p>
        <p>&#x987E;</p></td>
      <td><p>&#x201C;&#x89D2;&#x5EA6;&#x201D;&#x548C;&#x201C;&#x5F27;&#x5EA6;&#x201D;&#x662F;&#x5EA6;&#x91CF;&#x89D2;&#x5927;&#x5C0F;&#x7684;&#x4E24;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x5355;&#x4F4D;&#x3002;
        &#x5C31;&#x50CF;&#x201C;&#x7C73;&#x201D;&#x548C;&#x201C;&#x5E02;&#x5C3A;&#x201D;&#x662F;&#x5EA6;&#x91CF;&#x957F;&#x5EA6;&#x5927;&#x5C0F;&#x7684;&#x4E24;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x5355;&#x4F4D;&#x4E00;&#x6837;&#x3002;
        
        
        &#x89D2;&#x5EA6;&#xFF1A;&#x4E24;&#x6761;&#x5C04;&#x7EBF;&#x4ECE;&#x5706;&#x5FC3;&#x5411;&#x5706;&#x5468;&#x5C04;&#x51FA;&#xFF0C;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x5939;&#x89D2;&#x548C;&#x5939;&#x89D2;&#x6B63;&#x5BF9;&#x7684;&#x4E00;&#x6BB5;&#x5F27;&#x3002;&#x5F53;&#x8FD9;&#x6BB5;&#x5F27;&#x957F;&#x6B63;&#x597D;&#x7B49;&#x4E8E;&#x5706;&#x5468;&#x957F;&#x7684;360&#x5206;&#x4E4B;&#x4E00;&#x65F6;&#xFF0C;&#x4E24;&#x6761;&#x5C04;&#x7EBF;&#x7684;&#x5939;&#x89D2;&#x7684;&#x5927;&#x5C0F;&#x4E3A;1&#x5EA6;&#xFF0C;&#xFF08;&#x5982;&#x56FE;&#x4E00;&#xFF09; 
        
        &#x5F27;&#x5EA6;&#xFF1A;&#x4E24;&#x6761;&#x5C04;&#x7EBF;&#x4ECE;&#x5706;&#x5FC3;&#x5411;&#x5706;&#x5468;&#x5C04;&#x51FA;&#xFF0C;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x5939;&#x89D2;&#x548C;&#x5939;&#x89D2;&#x6B63;&#x5BF9;&#x7684;&#x4E00;&#x6BB5;&#x5F27;&#x3002;&#x5F53;&#x8FD9;&#x6BB5;&#x5F27;&#x957F;&#x6B63;&#x597D;&#x7B49;&#x4E8E;&#x5706;&#x7684;&#x534A;&#x5F84;&#x65F6;&#xFF0C;&#x4E24;&#x6761;&#x5C04;&#x7EBF;&#x7684;&#x5939;&#x89D2;&#x5927;&#x5C0F;&#x4E3A;1&#x5F27;&#x5EA6;&#x3002;&#xFF08;&#x5982;&#x56FE;&#x4E8C;&#xFF09; 
  
  <img>
  
        &#x534A;&#x5706;&#x7684;&#x957F;&#x5EA6;&#x662F;&#x534A;&#x5F84;&#x7684; &#x3C0;&#x500D;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x4E2A;&#x5E73;&#x89D2;&#xFF08;180&#x5EA6;&#xFF09;&#x662F; &#x3C0;&#x5F27;&#x5EA6;&#x3002; &#x5373;&#xFF1A;180&#x5EA6;&#xFF1D;&#x3C0;&#x5F27;&#x5EA6; 
        
          &#x89D2;&#x5EA6;&#xFF1D;&#x5F27;&#x5EA6;&#xD7;180/&#x3C0; 
          &#x5F27;&#x5EA6;&#xFF1D;&#x89D2;&#x5EA6;&#xD7;&#x3C0;/180
        </p></td>
      </tr>
    <tr>
      <td>&#xA0;</td>
      <th>&#x4E09; &#x89D2; &#x51FD; &#x6570;</th>
      </tr>
    <tr>
      <td> <p>&#x6570;</p>
        <p>&#x5B66;</p>
        <p>&#x77E5;</p>
        <p>&#x8BC6;</p>
        <p>&#x56DE;</p>
        <p>&#x987E;</p></td>
      <td><p>&#x4E09;&#x89D2;&#x51FD;&#x6570;&#xFF08;Trigonometric&#xFF09;&#x662F;&#x6570;&#x5B66;&#x4E2D;&#x5C5E;&#x4E8E;&#x521D;&#x7B49;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x8D85;&#x8D8A;&#x51FD;&#x6570;&#x7684;&#x4E00;&#x7C7B;&#x51FD;&#x6570;&#x3002;&#x5B83;&#x4EEC;&#x7684;&#x672C;&#x8D28;&#x662F;&#x4EFB;&#x610F;&#x89D2;&#x7684;&#x96C6;&#x5408;&#x4E0E;&#x4E00;&#x4E2A;&#x6BD4;&#x503C;&#x7684;&#x96C6;&#x5408;&#x7684;&#x53D8;&#x91CF;&#x4E4B;&#x95F4;&#x7684;&#x6620;&#x5C04;&#x3002;&#x901A;&#x5E38;&#x7684;&#x4E09;&#x89D2;&#x51FD;&#x6570;&#x662F;&#x5728;&#x5E73;&#x9762;&#x76F4;&#x89D2;&#x5750;&#x6807;&#x7CFB;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#xFF0C;&#x5176;&#x5B9A;&#x4E49;&#x57DF;&#x4E3A;&#x6574;&#x4E2A;&#x5B9E;&#x6570;&#x57DF;&#x3002;</p>
        <h3>
          &#x76F4;&#x89D2;&#x4E09;&#x89D2;&#x5B9A;&#x4E49;&#xFF1A;</h3>
        <p>&#x5728;&#x6570;&#x5B66;&#x4E2D;&#xFF0C;&#x4E09;&#x89D2;&#x51FD;&#x6570;&#xFF08;&#x4E5F;&#x53EB;&#x505A;&#x5706;&#x51FD;&#x6570;&#xFF09;&#x662F;&#x89D2;&#x7684;&#x51FD;&#x6570;&#x3002;&#x4E09;&#x89D2;&#x51FD;&#x6570;&#x901A;&#x5E38;&#x5B9A;&#x4E49;&#x4E3A;&#x5305;&#x542B;&#x8FD9;&#x4E2A;&#x89D2;&#x7684;&#x76F4;&#x89D2;&#x4E09;&#x89D2;&#x5F62;&#x7684;&#x4E24;&#x4E2A;&#x8FB9;&#x7684;&#x6BD4;&#x7387; &#x3002;&#x5728;&#x5E73;&#x9762;&#x76F4;&#x89D2;&#x5750;&#x6807;&#x7CFB;xOy&#x4E2D;&#xFF0C;&#x4ECE;&#x70B9;O&#x5F15;&#x51FA;&#x4E00;&#x6761;&#x5C04;&#x7EBF;OP&#xFF0C;&#x8BBE;&#x65CB;&#x8F6C;&#x89D2;&#x4E3A;&#x3B8;&#xFF0C;&#x8BBE;OP=r&#xFF0C;P&#x70B9;&#x7684;&#x5750;&#x6807;&#x4E3A;&#xFF08;x&#xFF0C;y&#xFF09;
          
          <img>
          
          <strong>&#x6B63;&#x5F26;&#x51FD;&#x6570;</strong> sin&#x3B1;=y/r 
          sin:&#x89D2;&#x3B1;&#x7684;&#x5BF9;&#x8FB9; &#x6BD4; &#x659C;&#x8FB9; &#x3000;&#x3000;
          
          <strong>&#x4F59;&#x5F26;&#x51FD;&#x6570;</strong> cos&#x3B1;=x/r 
          cos:&#x89D2;&#x3B1;&#x7684;&#x90BB;&#x8FB9; &#x6BD4; &#x659C;&#x8FB9; &#x3000;&#x3000;
          
          <strong>&#x6B63;&#x5207;&#x51FD;&#x6570;</strong> tan&#x3B1;=y/x 
          tan:&#x89D2;&#x3B1;&#x7684;&#x5BF9;&#x8FB9; &#x6BD4; &#x90BB;&#x8FB9; &#x3000;&#x3000;
          
          <strong>&#x4F59;&#x5207;&#x51FD;&#x6570;</strong> cot&#x3B1;=x/y 
          cot:&#x89D2;&#x3B1;&#x7684;&#x90BB;&#x8FB9; &#x6BD4; &#x5BF9;&#x8FB9; 
          
          <strong>&#x6B63;&#x5272;&#x51FD;&#x6570;</strong> sec&#x3B1;=r/x 
          sec:
          &#x89D2;&#x3B1;&#x7684;&#x659C;&#x8FB9; &#x6BD4; &#x90BB;&#x8FB9; &#x3000;
          
          <strong>&#x4F59;&#x5272;&#x51FD;&#x6570;</strong> cosec&#x3B1;=r/y 
          cosec:
          &#x89D2;&#x3B1;&#x7684;&#x659C;&#x8FB9; &#x6BD4; &#x5BF9;&#x8FB9; &#x3000;&#x3000; 
        </p>
        <p>sin&#x3B1;&#x5B9A;&#x4E49;&#x57DF;&#x65E0;&#x7A77;&#xFF0C;&#x503C;&#x57DF; [-1,1]  
        cos&#x3B1;&#x5B9A;&#x4E49;&#x57DF;&#x65E0;&#x7A77;&#xFF0C;&#x503C;&#x57DF; [-1,1] &#x5373;
        tan&#x3B1;&#x7684;&#x5B9A;&#x4E49;&#x57DF;(-&#x3C0;/2+k&#x3C0;,&#x3C0;/2+k&#x3C0;)&#xFF0C;k&#x5C5E;&#x4E8E;&#x6574;&#x6570;&#xFF0C;&#x503C;&#x57DF;&#x65E0;&#x7A77;
        <div>&#x5728;&#x6570;&#x5B66;&#x4E2D;&#xFF1A;&#x4E2D;&#x62EC;&#x53F7;&#x8868;&#x793A;&#x95ED;&#x533A;&#x95F4;,&#x5C0F;&#x62EC;&#x53F7;&#x8868;&#x793A;&#x5F00;&#x533A;&#x95F4;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;
          
        [-1,1]   &#x8868;&#x793A; -1 &lt;= x and x &lt;= 1
        (-1,1) &#x8868;&#x793A; -1 &lt;  x and x &lt; 1
        [-1,1) &#x8868;&#x793A; -1 &lt;=  x and x &lt; 1 </div>

        
        </p></td>
      </tr>
    <tr>
      <td>math.sin(x)</td>
      <td>&#x6B63;&#x5F26;&#x51FD;&#x6570;</td>
      <td>math.sin(math.rad(35))</td>
    </tr>
    <tr>
      <td>&#xA0;</td>
      <td>&#x4F59;&#x5272;(co<span>s</span>ec) &#x662F;&#x6B63;&#x5F26;(<span>s</span>in)&#x7684;&#x5012;&#x6570;&#xFF1A;
        
        cosec(x) == 1/math.sin(x) </td>
      </tr>
    <tr>
      <td>math.asin(x)</td>
      <td>&#x53CD;&#x6B63;&#x5F26;&#x51FD;&#x6570;</td>
      <td>math.asin(0.5)</td>
    </tr>
     <tr>
      <td>math.sinh(x)</td>
      <td>&#x53CC;&#x66F2;&#x7EBF;&#x6B63;&#x5F26;&#x51FD;&#x6570;</td>
      <td>math.sinh(0.5)</td>
    </tr>

    <tr>
      <td>math.cos(x)</td>
      <td>&#x4F59;&#x5F26;&#x51FD;&#x6570;</td>
      <td>math.cos(0.5)</td>
    </tr>
     <tr>
       <td>&#xA0;</td>
       <td>&#x6B63;&#x5272;(<span>s</span>ec) &#x662F;&#x4F59;&#x5F26;(co<span>s</span>)&#x7684;&#x5012;&#x6570;&#xFF1A;
         
        sec(x) == 1/math.cos(x) </td>
      </tr>
     <tr>
      <td>math.acos(x)</td>
      <td>&#x53CD;&#x4F59;&#x5F26;&#x51FD;&#x6570;</td>
      <td>math.acos(0.5)</td>
    </tr>

    <tr>
      <td>math.cosh(x)</td>
      <td>&#x53CC;&#x66F2;&#x7EBF;&#x4F59;&#x5F26;&#x51FD;&#x6570;</td>
      <td>math.cosh(0.5)</td>
    </tr>

    <tr>
      <td>math.tan(x)</td>
      <td>&#x6B63;&#x5207;&#x51FD;&#x6570;</td>
      <td>math.tan(0.6)</td>
    </tr>

    <tr>
      <td>math.atan(x)</td>
      <td>&#x53CD;&#x6B63;&#x5207;&#x51FD;&#x6570;</td>
      <td>math.atan(0.5)</td>
    </tr>

    <tr>
      <td>&#xA0;</td>
      <td> &#x4F59;&#x5207;(co<span>t</span>) &#x662F;&#x6B63;&#x5207;(<span>t</span>an)&#x7684;&#x5012;&#x6570;&#xFF1A;
        
        cot(x) == 1/math.tan(x) </td>
      </tr>
    <tr>
      <td>math.atan2(y,x)</td>
      <td>x / y&#x7684;&#x53CD;&#x6B63;&#x5207;&#x503C;</td>
      <td>math.atan2(45,25)</td>
    </tr>
    <tr>
      <td>math.tanh(x)</td>
      <td>&#x53CC;&#x66F2;&#x7EBF;&#x6B63;&#x5207;&#x51FD;&#x6570;</td>
      <td>math.tanh(0.6)</td>
    </tr>

</table>
