import numpy as np
from typing import List,Tuple

def dft( x: List[float], y:List[float] ) :
    data = np.empty((len(x)),dtype=np.complex128 )
    data.real = np.array(x)
    data.imag = np.array(y)

    fft_coeffs = np.fft.fftshift(np.fft.fft(data))
    magns = np.abs(fft_coeffs)
    angles = np.angle(fft_coeffs)

    idx = magns.argsort()[::-1]
    freqs = idx - len(x)//2

    return magns[idx], angles[idx], freqs
