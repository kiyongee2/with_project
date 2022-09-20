/*
 * UX �м� ������ Ʈ��ŷ �ڵ�  (����24)
 * �ش� js �� ������Ʈ ����� include
 * ������24�� �ش� js include ���� �ʰ� ������24 ��ü ���� jsp�� ����
 */


var hostChk = window.location.hostname;     
	
if(hostChk == 'gov.kr' || hostChk == 'www.gov.kr'){
	
	//����24 ������
	/*(function(w, d, a){
	    w.__beusablerumclient__ = {
	        load : function(src){
	            var b = d.createElement("script");
	            b.src = src; b.async=true; b.type = "text/javascript";
	            d.getElementsByTagName("head")[0].appendChild(b);
	        }
	    };w.__beusablerumclient__.load(a);
	})(window, document, "//rum.beusable.net/script/b210825e135620u973/309f0c3455");*/
	
	//������24 ������
	(function(w, d, a){
	    w.__beusablerumclient__ = {
	        load : function(src){
	            var b = d.createElement("script");
	            b.src = src; b.async=true; b.type = "text/javascript";
	            d.getElementsByTagName("head")[0].appendChild(b);
	        }
	    };w.__beusablerumclient__.load(a);
	})(window, document, "//rum.beusable.net/script/b201201e110113u450/f41fc5f0a9");
	
	//������24 BA
	(function(w, d, a){
	    w.__baclient__ = {
	        load : function(src){
	            var b = d.createElement("script");
	            b.src = src; b.async=true; b.type = "text/javascript";
	            d.getElementsByTagName("head")[0].appendChild(b);
	        }
	    };w.__baclient__.load(a);
	})(window, document, "//ba.beusable.net/script/ba/d49af19d5f");
	
}
